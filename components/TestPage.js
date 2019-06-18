import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    AsyncStorage,
    Image,
    FlatList
} from "react-native";
import axios from "axios";
import "../mockdata/formdata1.js";
import "../mockdata/formdata2.js";

/**
 * 定义一个新增表单项 组件
 * */
export default class TestPage extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            gData: "", // 获取到的数据
            pData: "", // 提交的数据
            list: null, // 列表,将要存入一个对象
            inputName: "",
            inputAddress: "",
            inputPhone: ""
        };
    }
    static navigationOptions = {
        title: "添加联系人"
    };
    componentDidMount() {
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
                console.log(err);
            });

        /*
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
    }
    // 存储数据到本地

    _addData = () => {
        AsyncStorage.setItem("keytest22", "test async22", () => {
            if (error == null) {
                console.log("存储成功");
                // 其他操作
            } else {
                console.log("error,存储失败");
            }
        });

        console.log("走到了add操作");
    };

    render() {
        const { navigation } = this.props;
        const { state, setParams } = navigation;
        const { params } = state;
        const showText = params.inputMode === "edit" ? "正在编辑" : "编辑完成";
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>姓名</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="请填写姓名"
                        onChangeText={text =>
                            this.setState({
                                inputName: text
                            })
                        }
                        value={this.state.inputName}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.text}>地址</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text =>
                            this.setState({
                                inputAddress: text
                            })
                        }
                        value={this.state.inputAddress}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>手机号码</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={text => {
                            this.setState({
                                inputPhone: text
                            });
                            setParams({
                                inputMode: "edit"
                            });
                        }}
                        value={this.state.inputPhone}
                    />
                </View>
                <Text style={styles.text}>{showText}</Text>
                <View style={styles.touchView}>
                    <View style={styles.touchButton}>
                        <Button
                            title={
                                params.inputMode === "edit" ? "保存" : "编辑"
                            }
                            color="#fff"
                            onPress={() => {
                                setParams({
                                    inputMode:
                                        params.inputMode === "edit"
                                            ? ""
                                            : "edit"
                                });
                                state.params.onUpdate("test传来的");
                                this._addData;
                                navigation.goBack();
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        //addingTop: 10
        width: "100%",
        height: "100%",

        backgroundColor: "#eee"
    },
    inputView: {
        width: "100%",
        height: 50,

        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomColor: "#eee",
        borderBottomWidth: 1
    },
    text: {
        width: 80,
        height: 50,
        lineHeight: 50,
        fontSize: 20
    },
    inputStyle: {
        flex: 1,
        height: 50,
        margin: 10,
        fontSize: 20
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
