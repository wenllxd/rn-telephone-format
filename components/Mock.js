import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Image, FlatList } from "react-native";
import axios from "axios";
import "../mockdata/data1.js";
import "../mockdata/data2.js";

export default class Mock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gData: "", // 获取到的数据
            pData: "", // 提交的数据
            list: null // 列表,将要存入一个对象
        };
    }

    componentDidMount() {
        /*
        axios.get('/getdata1', { dataType: 'json' }).then((res) => {
            //console.log(res.data);
            this.setState({
                gData: res.data.email,
                list: res.data.list
            });
        }).catch((err) => {
            console.log(err);
        })
        */
        axios
            .post("/postdata2", { dataType: "json" })
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
    }
    render() {
        console.log(this.state.list);
        return (
            <View style={StyleSheet.container}>
                <FlatList
                    data={this.state.list}
                    renderItem={({ item }) => (
                        <Text style={styles.item}>{item.id}</Text>
                    )}
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
    }
});
