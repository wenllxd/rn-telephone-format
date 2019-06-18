import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

//import FormAdd from "../components/FormAdd";
import FormList from "../components/FormList";

import "../mockdata/formdata1.js";

export default class App extends Component {
    constructor(props) {
        console.disableYellowBox = true;
        super(props);
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <FormList />
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
    }
});
