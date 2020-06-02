import React, {useRef} from 'react';
import {SketchCanvas} from '@terrylinla/react-native-sketch-canvas';
import {View} from 'react-native';
import styles from './styles';

interface CanvasRef {
  current: SketchCanvas;
}

const SimpleDrawScreen = () => {
  const canvasRef: CanvasRef = useRef();

  return (
    <View style={styles.container}>
      <SketchCanvas
        ref={canvasRef}
        touchEnabled={true}
        strokeColor="#000000"
        strokeWidth={2}
        style={styles.canvas}
      />
    </View>
  );
};

export default SimpleDrawScreen;
