import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Image,
    FlatList
} from "react-native";
import axios from "axios";
import "../mockdata/formdata1.js";
import "../mockdata/formdata2.js";

/**
 * 定义一个新增表单项 组件
 * */
export default class FormAdd extends Component {
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
    render() {
        console.log(this.state.list);
        return (
            <View style={StyleSheet.container}>
                <Text>add页面</Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text =>
                        this.setState({
                            inputName: text
                        })
                    }
                    value={this.state.inputVal}
                />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text =>
                        this.setState({
                            inputAddress: text
                        })
                    }
                    value={this.state.inputVal}
                />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={text =>
                        this.setState({
                            inputPhone: text
                        })
                    }
                    value={this.state.inputVal}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        //addingTop: 10
    },
    item: {
        //paddingTop: 20,
        fontSize: 16
    },
    inputStyle: {
        width: 200,
        height: 40,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#06aaff",
        borderRadius: 2
    }
});
