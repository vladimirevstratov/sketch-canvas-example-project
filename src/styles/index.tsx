import {StyleSheet} from 'react-native';
import variables, {scale} from '../../src/constants/styles-constants';
import {
  BASE_WHITE_COLOR,
  PROJECT_MAIN_WHITE,
  PROJECT_LIGHT_BLUE,
  MAIN_DARK_GREEN_COLOR,
  DARK_GREY_COLOR,
  MAIN_LIGHT_BLACK_COLOR,
} from '../../src/constants/colors';

const {regular} = variables.fontSize;

export const iconSize = scale(30);
export const iconSmallSize = scale(28);
export const iconMSmallSize = scale(22);
export const iconXMSmallSize = scale(20);
export const iconXSmallSize = scale(16);
export const iconCirceRadius = scale(12);
export const iconCirceSize = iconCirceRadius * 2.1;

export default StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: MAIN_LIGHT_BLACK_COLOR,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: PROJECT_MAIN_WHITE,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 1,
    justifyContent: 'flex-start',
    backgroundColor: PROJECT_MAIN_WHITE,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(52),
    height: scale(400),
    marginLeft: scale(8),
    marginTop: scale(15),
    paddingVertical: scale(10),
    backgroundColor: BASE_WHITE_COLOR,
    borderRadius: scale(4),
    zIndex: 1,
    elevation: 2,
  },
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(40),
    height: scale(40),
    padding: scale(5),
  },
  divider: {
    height: scale(1),
    width: scale(40),
    marginVertical: scale(5),
    backgroundColor: DARK_GREY_COLOR,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(120),
    height: scale(45),
    marginLeft: 'auto',
    marginRight: scale(8),
    marginTop: scale(15),
    borderRadius: scale(4),
    backgroundColor: MAIN_DARK_GREEN_COLOR,
    zIndex: 1,
  },
  saveText: {
    color: BASE_WHITE_COLOR,
    fontSize: regular,
  },
  colorContainer: {
    justifyContent: 'flex-start',
    zIndex: 1,
    height: scale(460),
  },
  colorSelect: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(50),
    marginLeft: scale(8),
    backgroundColor: BASE_WHITE_COLOR,
    borderRadius: scale(4),
    paddingVertical: scale(5),
    elevation: 2,
  },
  lineContainer: {
    justifyContent: 'flex-start',
    zIndex: 1,
    height: scale(50),
    marginTop: scale(270),
  },
  lineSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
    backgroundColor: BASE_WHITE_COLOR,
    borderRadius: scale(4),
    paddingVertical: scale(5),
    paddingHorizontal: scale(5),
    elevation: 2,
  },
  shapeContainer: {
    justifyContent: 'flex-start',
    zIndex: 1,
    height: scale(50),
    marginTop: scale(140),
  },
  shapeSelect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
    backgroundColor: BASE_WHITE_COLOR,
    borderRadius: scale(4),
    paddingVertical: scale(5),
    paddingHorizontal: scale(5),
    elevation: 2,
  },
  activeElement: {
    backgroundColor: PROJECT_MAIN_WHITE,
    borderColor: PROJECT_LIGHT_BLUE,
    borderWidth: scale(1),
    borderRadius: scale(2),
    borderStyle: 'dashed',
  },
  zoomContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  admission: {
    zIndex: 2,
  },
});
