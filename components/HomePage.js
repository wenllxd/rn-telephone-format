import React, { Component } from "react";
import { View, Text, Button, Image } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";
// 导入组件
import FormList from "./FormList";
import FormAdd from "./FormAdd";
import TestPage from "./TestPage";

// createStackNavigator()返回React组件
// 路由栈
const RootStack = createStackNavigator(
    {
        // 路由配置对象,路由映射到哪个组件
        Home: {
            screen: FormList,
            navigationOptions: {
                //header: null
            }
        },
        Details: {
            screen: FormAdd,
            navigationOptions: props => {
                // 设置动态参数
                const { navigation } = props;
                return {
                    headerTitle: navigation.state.params.name
                };
            }
        },
        TestPage: {
            screen: TestPage,
            navigationOptions: props => {
                // 设置动态参数
                // 注意：路由配置页面用props,屏幕页面screen（也就是组件中）用this.props
                const { navigation } = props;
                const { state, setParams } = navigation;
                const { params } = state;
                return {
                    headerTitle: params.title ? params.title : "新增联系人",
                    headerStyle: {
                        borderBottomWidth: 11,
                        borderBottomColor: "#eee"
                    },
                    headerRight: (
                        <Button
                            title={
                                params.inputMode === "edit" ? "保存" : "编辑"
                            }
                            onPress={() => {
                                setParams({
                                    inputMode:
                                        params.inputMode === "edit"
                                            ? ""
                                            : "edit"
                                });
                            }}
                        />
                    )
                };
            }
        }
    },
    {
        // 导航器配,可选对象
        initialRouteName: "Home"
        //mode: "modal"
    }
);

// 不允许导航器直接暴露在根组件下,必须要用createAPPContainer容器组件包裹一下才可以使用
/**
 * 或者用这种写法导出：
 * export default createAPPContainer（RootStack）;import导入写法不变
 */
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
