import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './src/styles';
import {BASE_BLACK_COLOR} from './src/constants/colors';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

interface CanvasRef {
  current: SketchCanvas;
}

enum toolPosition {
  magnifier,
  pen,
  line,
  shape,
  circle,
  rectangle,
  triangle,
  square,
  tap,
  text,
  eraser,
  curveLine1,
  curveLine2,
  curveLine3,
}
const eraseColor = 'transparent';
const thickness = {
  first: 2,
  second: 4,
  third: 6,
};

const App = () => {
  const initialState = {
    color: BASE_BLACK_COLOR,
    thickness: thickness.first,
  };
  const [drawStyle, changeDrawStyle] = useState(initialState);
  const [isVisible, setIsVisible] = useState({
    color: false,
    line: false,
    shape: false,
  });
  const [prevVisible, setPrevVisible] = useState();
  const [isErase, setIsErase] = useState(false);
  const [isShape, setIsShape] = useState(false);
  const [active, setActive] = useState({
    position: toolPosition.pen,
    innerPosition: toolPosition.curveLine1,
  });
  const [zoomState, setZoomState] = useState({
    zoom: false,
    zoomLevel: 1,
    lastX: 0,
    lastY: 0,
  });
  console.log('Zoom', zoomState.zoomLevel);
  const [distanceState, setDistanceState] = useState({
    distanceLeft: 0,
    distanceRight: 0,
    distanceBottom: 0,
    distanceTop: 0,
  });
  const [isLine, setIsLine] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const pathRef: CanvasRef = useRef();

  const saveDirectory = 'Бригада/Проекты';
  const tempFileName = 'nam124564576567';

  const TOOL_TYPE = {
    color: 'color',
    line: 'line',
    shape: 'shape',
  };

  const setVisible = (type, prevType) => {
    if (!isVisible[type]) {
      setIsVisible({
        ...isVisible,
        [prevType]: false,
        [type]: true,
      });
    } else {
      setIsVisible({
        ...isVisible,
        [type]: false,
      });
    }
  };

  const toggle = (position, isInner) => {
    if (!isInner) {
      setActive({
        ...active,
        position,
      });
      toggleZoom(position);
    } else {
      setActive({
        ...active,
        innerPosition: position,
      });
    }
  };

  const activeStyle = (position, isInner) => {
    if (!isInner) {
      if (active.position === position) {
        return styles.activeElement;
      }
    } else {
      if (active.innerPosition === position) {
        return styles.activeElement;
      }
    }
    return '';
  };

  const setDistance = (
    distanceLeft,
    distanceRight,
    distanceBottom,
    distanceTop,
  ) => {
    let dLeft = distanceLeft;
    let dRight = distanceRight;
    let dBottom = distanceBottom;
    let dTop = distanceTop;
    if (distanceLeft > 0) {
      dLeft = 0;
      dRight = distanceRight + distanceLeft;
    }
    if (distanceRight > 0) {
      dRight = 0;
      dLeft = distanceLeft + distanceRight;
    }
    if (distanceBottom > 0) {
      dBottom = 0;
      dTop = distanceTop + distanceBottom;
    }
    if (distanceTop > 0) {
      dTop = 0;
      dBottom = distanceBottom + distanceTop;
    }

    setDistanceState({
      ...distanceState,
      distanceLeft: dLeft,
      distanceRight: dRight,
      distanceBottom: dBottom,
      distanceTop: dTop,
    });
  };

  const endZoomState = (event, gestureState, zoomableViewEventObject) => {
    setDistance(
      zoomableViewEventObject.distanceLeft,
      zoomableViewEventObject.distanceRight,
      zoomableViewEventObject.distanceBottom,
      zoomableViewEventObject.distanceTop,
    );
    setZoomState({
      ...zoomState,
      zoomLevel: zoomableViewEventObject.zoomLevel,
      lastX: zoomableViewEventObject.offsetX,
      lastY: zoomableViewEventObject.offsetY,
    });

    changeDrawStyle({
      ...drawStyle,
      thickness: drawStyle.thickness / zoomableViewEventObject.zoomLevel,
    });
  };

  const endShift = (event, gestureState, zoomableViewEventObject) => {
    setDistance(
      zoomableViewEventObject.distanceLeft,
      zoomableViewEventObject.distanceRight,
      zoomableViewEventObject.distanceBottom,
      zoomableViewEventObject.distanceTop,
    );
    setZoomState({
      ...zoomState,
      lastX: zoomableViewEventObject.offsetX,
      lastY: zoomableViewEventObject.offsetY,
    });
  };

  const toggleZoom = position => {
    if (position !== 0) {
      setZoomState({
        ...zoomState,
        zoom: false,
      });
    } else {
      setZoomState({
        ...zoomState,
        zoom: true,
      });
    }
  };

  const closePopups = () => {
    setIsVisible({
      color: false,
      line: false,
      shape: false,
    });
  };

  return (
    <View style={styles.rootContainer}>
      <View
        style={styles.container}
        pointerEvents={isDisable ? 'none' : 'auto'}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={{
              ...styles.icon,
              ...activeStyle(toolPosition.magnifier, false),
            }}
            onPress={() => {
              pathRef.current.unselectShape();
              toggle(toolPosition.magnifier, false);
              setIsShape(false);
              closePopups();
            }}>
            <Text>Лупа</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.icon, ...activeStyle(toolPosition.pen, false)}}
            onPress={() => {
              pathRef.current.unselectShape();
              toggle(toolPosition.pen, false);
              setIsErase(false);
              setIsLine(false);
              setIsShape(false);
              closePopups();
              changeDrawStyle({
                ...drawStyle,
                color: BASE_BLACK_COLOR,
              });
            }}>
            <Text>Ручка</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.icon, ...activeStyle(toolPosition.line, false)}}
            onPress={() => {
              pathRef.current.unselectShape();
              toggle(toolPosition.line, false);
              setIsErase(false);
              setIsLine(true);
              setIsShape(false);
              closePopups();
            }}>
            <Text>Линия</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.icon,
              ...activeStyle(toolPosition.shape, false),
            }}
            onPress={() => {
              toggle(toolPosition.shape, false);
              setVisible(TOOL_TYPE.shape, prevVisible);
              setPrevVisible(TOOL_TYPE.shape);
            }}>
            <Text>Фигуры</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.icon,
              ...activeStyle(toolPosition.text, false),
            }}
            onPress={() => {
              pathRef.current.unselectShape();
              toggle(toolPosition.text, false);
              setIsErase(false);
              setIsLine(false);
              setIsShape(true);
              closePopups();
            }}>
            <Text>Текст</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.icon,
              ...activeStyle(toolPosition.eraser, false),
            }}
            onPress={() => {
              pathRef.current.unselectShape();
              toggle(toolPosition.eraser, false);
              setIsErase(true);
              setIsLine(false);
              setIsShape(false);
              closePopups();
            }}>
            <Text>Резинка</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setVisible(TOOL_TYPE.color, prevVisible);
              toggle(toolPosition.pen, false);
              setIsLine(false);
              setPrevVisible(TOOL_TYPE.color);
              changeDrawStyle({
                ...drawStyle,
                color: 'red',
              });
            }}>
            <Text>Цвет</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              setVisible(TOOL_TYPE.line, prevVisible);
              setPrevVisible(TOOL_TYPE.line);
            }}>
            <Text>Толщина</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              pathRef.current.undo();
              closePopups();
            }}>
            <Text>Назад</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              pathRef.current.save(
                'png',
                false,
                saveDirectory,
                tempFileName,
                true,
                true,
                false,
              );
              console.log('Должно сохраниться');
            }}>
            <Text>Сохранить</Text>
          </TouchableOpacity>
        </View>
        {isVisible.shape && (
          <View style={styles.shapeContainer}>
            <View style={styles.shapeSelect}>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.circle, true),
                }}
                onPress={() => {
                  pathRef.current.unselectShape();
                  pathRef.current.addShape({shapeType: 'Circle'});
                  toggle(toolPosition.circle, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: drawStyle.thickness / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.shape]: false,
                  });
                  setIsShape(true);
                }}>
                <Text>Круг</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.rectangle, true),
                }}
                onPress={() => {
                  pathRef.current.unselectShape();
                  pathRef.current.addShape({shapeType: 'Rect'});
                  toggle(toolPosition.rectangle, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: drawStyle.thickness / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.shape]: false,
                  });
                  setIsShape(true);
                }}>
                <Text>Прямоугольник</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.triangle, true),
                }}
                onPress={() => {
                  pathRef.current.unselectShape();
                  pathRef.current.addShape({shapeType: 'Triangle'});
                  toggle(toolPosition.triangle, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: drawStyle.thickness / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.shape]: false,
                  });
                  setIsShape(true);
                }}>
                <Text>Треугольник</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.square, true),
                }}
                onPress={() => {
                  pathRef.current.unselectShape();
                  pathRef.current.addShape({shapeType: 'Square'});
                  toggle(toolPosition.square, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: drawStyle.thickness / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.shape]: false,
                  });
                  setIsShape(true);
                }}>
                <Text>Квадрат</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.tap, true),
                }}
                onPress={() => {
                  pathRef.current.unselectShape();
                  pathRef.current.addShape({shapeType: 'Tap'});
                  toggle(toolPosition.tap, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: drawStyle.thickness / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.shape]: false,
                  });
                  setIsShape(true);
                }}>
                <Text>Кран</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isVisible.color && <View style={styles.colorContainer} />}
        {isVisible.line && (
          <View style={styles.lineContainer}>
            <View style={styles.lineSelect}>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.curveLine1, true),
                }}
                onPress={() => {
                  toggle(toolPosition.curveLine1, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: thickness.first / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.line]: false,
                  });
                }}>
                <Text>Толщ 1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.curveLine2, true),
                }}
                onPress={() => {
                  toggle(toolPosition.curveLine2, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: thickness.second / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.line]: false,
                  });
                }}>
                <Text>Толщ 2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.icon,
                  ...activeStyle(toolPosition.curveLine3, true),
                }}
                onPress={() => {
                  toggle(toolPosition.curveLine3, true);
                  changeDrawStyle({
                    ...drawStyle,
                    thickness: thickness.third / zoomState.zoomLevel,
                  });
                  setIsVisible({
                    ...isVisible,
                    [TOOL_TYPE.line]: false,
                  });
                }}>
                <Text>Толщ 3</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.zoomContainer}>
          <ReactNativeZoomableView
            zoomEnabled={zoomState.zoom}
            maxZoom={3}
            minZoom={1}
            initialZoom={zoomState.zoomLevel}
            initialOffsetX={zoomState.lastX}
            initialOffsetY={zoomState.lastY}
            bindToBorders={true}
            onZoomEnd={endZoomState}
            onShiftingEnd={endShift}
            shouldResetZoomOnDisable={true}>
            <SketchCanvas
              zoomLevel={zoomState.zoomLevel}
              touchEnabled={!zoomState.zoom}
              lineEnabled={isLine}
              shapeEnabled={isShape}
              lastX={zoomState.lastX}
              lastY={zoomState.lastY}
              distanceLeft={distanceState.distanceLeft}
              distanceRight={distanceState.distanceRight}
              distanceBottom={distanceState.distanceBottom}
              distanceTop={distanceState.distanceTop}
              ref={pathRef}
              style={styles.canvas}
              strokeColor={!isErase ? drawStyle.color : eraseColor}
              strokeWidth={drawStyle.thickness}
              shapeConfiguration={{
                shapeStrokeWidth:
                  drawStyle.thickness > 1 ? drawStyle.thickness : 1,
              }}
              onSketchSaved={(success, filePath) => {
                if (success) {
                  console.log('Сохранено');
                } else {
                  console.log('Не сохранено');
                }
              }}
            />
          </ReactNativeZoomableView>
        </View>
      </View>
    </View>
  );
};

export default App;
