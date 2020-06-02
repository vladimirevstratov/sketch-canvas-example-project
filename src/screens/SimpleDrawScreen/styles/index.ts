import {StyleSheet} from 'react-native';
import {PROJECT_MAIN_WHITE} from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 1,
    justifyContent: 'flex-start',
    backgroundColor: PROJECT_MAIN_WHITE,
  },
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
});

export default styles;
