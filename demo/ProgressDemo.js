/**
 * 进度条demo页面，父组件
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Progress from '../components/Progress.js';

export default class App extends Component {
    constructor(props) {
        super(props);
        //取消黄色警告
        console.disableYellowBox = true;
        this.state = {
            name: ''
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <Progress style={styles.progress}>
                    <span>hello</span>
                    <span>hello2</span>
                </Progress>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5FCFF',
    },
    progress: {
        textAlign: 'center'
    }
});