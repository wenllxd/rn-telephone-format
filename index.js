/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native';
//import App from './App'; 替换首页文件ap
import App from './demo/InputDemo';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
