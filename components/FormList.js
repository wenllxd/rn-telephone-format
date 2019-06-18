import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Button,
    SafeAreaView,
    AsyncStorage,
    FlatList,
    Alert
} from "react-native";

import axios from "axios";
import "../mockdata/formdata1.js";
import "../mockdata/formdata2.js";

/**
 * 定义一个表单列表 组件
 * */
var dataJson = require("../mockdata/data.json");

export default class FormList extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            gData: "", // 获取到的数据
            pData: "", // 提交的数据
            list: null, // 列表,将要存入一个对象
            listTemp: dataJson,
            test: "\n"
        };
    }

    // 导航标题
    static navigationOptions = {
        title: "联系人列表"
    };

    componentDidMount() {
        /*
        axios
            .get("/formdata1", { dataType: "json" })
            .then(res => {
                //console.log(res.data);
                this.setState({
                    gData: res.data.email,
                    list: res.data.list
                });
            })
            .catch(err => {
                //console.log(err);
            });

        axios
            .post("/formdata2", { dataType: "json" })
            .then(res => {
                console.log(res.data);
                this.setState({
                    pData: "发送post成功",
                    list: res.data.list
                });
            })
            .catch(err => {
                console.log(err);
            });
        */
        // 获取本地数据
        this._getAllData();
    }

    // 存储数据到本地

    _addData = () => {
        console.log("主页add");
        AsyncStorage.setItem("keytest11", "test async11", error => {
            if (error == null) {
                console.log("存储成功");
                // 其他操作
            } else {
                console.log("error,存储失败");
            }
        });
    };

    // 获取本地数据
    _getStoreData = () => {
        AsyncStorage.getItem("keytest11", (error, result) => {
            if (error == null) {
                console.log("读取成功");
                // 其他操作
            } else {
                console.log("error,读取失败");
            }
        });
    };

    // 获取本地所有数据
    _getAllData = () => {
        console.log("走到了getAllData操作");
        AsyncStorage.getAllKeys((err, keys) => {
            if (keys && keys.length > 0) {
                keys.map((key, index) => {
                    AsyncStorage.getItem(key, (error, result) => {
                        console.log(result);
                        let msg = this.state.test + key + ":" + result + "\n";
                        this.setState({ test: msg });
                    });
                });
            }
        });
    };

    // 分割线
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: "#fff" }} />;
    };

    // 列表样式
    _renderItem = ({ item }) => {
        return (
            <View style={styles.itemList} key={item.id}>
                <Text style={styles.item}>
                    {item.name} {item.phone}
                </Text>
                <Text style={styles.item}>{item.city}</Text>
            </View>
        );
    };

    onUpdate = data => {
        // 从TestPage页面传回来的数据
        console.log(data);
        this._getAllData();
    };

    render() {
        console.log(this.state.list);
        const { navigation } = this.props;
        const { state, setParams } = navigation;
        const { params } = state;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <FlatList
                        data={this.state.listTemp}
                        keyExtractor={(item, index) => item.id.toString()}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                    />
                    <View style={styles.touchView}>
                        <View style={styles.touchButton}>
                            <Button
                                title="添加联系人"
                                color="#fff"
                                onPress={() => {
                                    this.props.navigation.navigate("Details", {
                                        name: "新增联系人"
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.touchView}>
                        <View style={styles.touchButton}>
                            <Button
                                title="跳转TestPage"
                                color="#fff"
                                onPress={() => {
                                    this.props.navigation.navigate("TestPage", {
                                        title: "",
                                        inputMode: "edit",
                                        onUpdate: this.onUpdate
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <Text>{this.state.test}</Text>
                    <Button
                        title="ADD"
                        onPress={() => {
                            this._addData();
                        }}
                    />

                    <Button
                        title="GET"
                        onPress={() => {
                            this._getAllData();
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#eeeeee"
    },
    itemList: {
        marginTop: 10,
        paddingTop: 15,
        paddingLeft: 15,
        backgroundColor: "#fff"
    },
    item: {
        paddingBottom: 10,
        fontSize: 16
    },
    touchView: {
        backgroundColor: "#fff",
        height: 70,
        marginTop: 30
    },
    touchButton: {
        backgroundColor: "#388bff",
        margin: 15,
        height: 40,
        borderRadius: 2
    }
});
