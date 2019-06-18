/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
//import App from './App'; 替换首页文件app
//import App from './demo/InputDemo';
//import App from './demo/ProgressDemo';
//mock数据测试
//import App from './demo/MockDemo';
//import App from "./demo/FormDemo";
import App from "./components/HomePage";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
