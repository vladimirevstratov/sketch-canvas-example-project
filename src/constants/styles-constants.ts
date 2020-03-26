import {Dimensions, PixelRatio} from 'react-native';
// @ts-ignore
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  $scaleFactor: () => {
    if (PixelRatio.get() === 3.5) {
      return Math.round(PixelRatio.get());
    }

    return PixelRatio.get();
  },
  $fontScaleFactor: PixelRatio.getFontScale(),
  $scaling: 1,
  '@media (min-width: 800)': {
    $scaling: 1.5,
  },
});

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const localWidth = screenWidth >= screenHeight ? screenHeight : screenWidth;
const widthCoef = localWidth / 390;

export const scale = (size: number) => widthCoef * size;

export const ptToDp = (valueInPt: number) => {
  const valueInPx = (valueInPt * EStyleSheet.value('$scaleFactor')) / 72;
  return (
    valueInPx *
    (160 / EStyleSheet.value('$scaleFactor')) *
    EStyleSheet.value('$scaling')
  );
};

export const pxToSp = (valueInPx: number) => {
  return (
    valueInPx *
    EStyleSheet.value('$fontScaleFactor') *
    EStyleSheet.value('$scaling')
  );
};

export const isTablet = () => {
  if (localWidth > 480) {
    return true;
  } else {
    return false;
  }
};

const variables = {
  fontSize: {
    xxxSmall: (localWidth * 9) / 360,
    xxSmall: (localWidth * 10) / 360,
    xSmall: (localWidth * 11) / 360,
    smaller: (localWidth * 12) / 360,
    smallTwo: (localWidth * 12.5) / 360,
    small: (localWidth * 13) / 360,
    regularSmall: (localWidth * 14) / 360,
    regular: (localWidth * 15) / 360,
    mainRegular: (localWidth * 16) / 360,
    large: (localWidth * 17) / 360,
    extLarge: (localWidth * 20) / 360,
    extraLarge: (localWidth * 32) / 360,
  },
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
};

export const FONT_BOLD = 'Roboto-Bold';
export const FONT_ITALIC = 'Roboto-Italic';
export const FONT_MEDIUM = 'Roboto-Medium';
export const FONT_MEDIUM_ITALIC = 'Roboto-MediumItalic';
export const FONT_REGULAR = 'Roboto-Regular';

export default variables;
