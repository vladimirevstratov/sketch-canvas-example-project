/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SimpleDrawScreen from './src/screens/SimpleDrawScreen';

AppRegistry.registerComponent(appName, () => SimpleDrawScreen);
