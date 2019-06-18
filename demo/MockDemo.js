import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import Mock from "../components/Mock";
//挂载Mock
import "../mockdata/data1.js";

//import '../mockdata/data2.js';

export default class App extends Component {
    constructor(props) {
        console.disableYellowBox = true;
        super(props);
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Mock />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5FCFF"
    }
});
