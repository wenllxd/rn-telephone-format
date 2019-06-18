/**
 * 进度条子组件
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ART, ProgressViewIOS } from 'react-native';
import { exportDefaultSpecifier } from '@babel/types';


var {
    Surface, // 一个矩形可渲染的区域，是其他元素的容器
    Shape, // 形状定义，可填充
    Path, // 路径
    Group, // 可容纳多个形状、文本和其他分组
    LinearGradient, // 渐变色
    Pattern, // 填充图片
    ClippingRectangle, // 剪辑
} = ART;


export default class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeTime: 60,
            timerTitle: '倒计时',
            percent: 1,
            x: 0,
            y: 0,
            arcBool: true, // 绘制扇形的大弧度还是小弧度
            outRadius: 50,
        };
    }

    // 计算坐标，需要的参数，进度百分比、半径
    getCoordinate = (percent, radius) => {
        let x = 0;
        let y = 0;
        let arcBool = true;
        // 注意Math.sin(num)等，num是弧度，需要把角度换算成弧度
        // 程序处理浮点数的时候，每一次运算都会取一次近似值，Math.sin(Math.PI)近似于0但不等于0,所以用Math.round()函数来解决
        x = radius * Math.round(Math.sin(percent * 360 * Math.PI / 180) * 1000000) / 1000000;
        y = radius - radius * Math.round(Math.cos(percent * 360 * Math.PI / 180) * 1000000) / 1000000;
        if (percent < 0.5) {
            arcBool = false;
        }
        return { x, y, arcBool };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            //console.log('定时器，每隔一秒打印');
            var time = this.state.codeTime - 1;
            var newPercent = time / 60;
            if (time === 0) {
                this.timer && clearInterval(this.timer);
                this.setState({
                    codeTime: 0,
                    percent: 0,
                    timerTitle: '倒计时结束',
                    x: 0,
                    y: 0
                });
            } else {
                this.setState({
                    codeTime: time,
                    percent: newPercent,
                    x: this.getCoordinate(newPercent, this.state.outRadius).x,
                    y: this.getCoordinate(newPercent, this.state.outRadius).y,
                    arcBool: this.getCoordinate(newPercent, this.state.outRadius).arcBool
                });
            }
            //console.log("x:" + this.getCoordinate(newPercent, 50).x + "y:" + this.getCoordinate(newPercent, 50).y);
        }, 1000);

    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    render() {

        const path = new Path(); // 固定外圈
        path.moveTo(50, 0); // 将起始点移动到(50,0) 默认是(0,0)
        path.arc(0, 100, 50);  // 将(50,0)看成新的坐标系(0,0),由此进行 顺时针 (100正) 的画半弧
        path.arc(0, -100, 50); // 将(0,100)看成新的坐标系(0,0)，由此进行 逆时针 (-100负)的画半弧
        path.close(); // 闭合

        const path2 = new Path(); // 固定内圈
        path2.moveTo(50, 5); // 
        path2.arc(0, 90, 45);  // 
        path2.arc(0, -90, 45);
        path2.close();

        const path3 = new Path(); // 绘图圈
        if (this.state.percent == 1) {
            path3.moveTo(50, 0).arc(0, 100, 50, 50, true, false).arc(0, -100, 50, 50, true, false);
        } else if (this.state.percent == 0) {
            path3.moveTo(50, 0).arc(0, 0, 50, 50, true, false);
        } else {
            path3.moveTo(50, 50).lineTo(50, 0).arc(this.state.x, this.state.y, this.state.outRadius, this.state.outRadius, this.state.arcBool, false);
        }

        /**path4.arc(x, y, xr, yr, bool1, bool2);
        * bool1值代表小弧度还是大弧度，true为大弧度，false为小弧度
        * bool2值代表是否逆时针，true为逆时针，false为顺时针
        * 两个布尔值都要配合x,y的坐标来体现效果
        */
        const path4 = new Path(); // 单独测试圈
        if (this.state.percent == 1) {
            path4.moveTo(160, 0).arc(0, 100, 50, 50, true, false).arc(0, -100, 50, 50, true, false);
        } else if (this.state.percent == 0) {
            path4.moveTo(160, 0).arc(0, 0, 50, 50, true, false);
        } else {
            path4.moveTo(160, 50).lineTo(160, 0).arc(this.state.x, this.state.y, this.state.outRadius, this.state.outRadius, this.state.arcBool, false);
        }

        return (
            <View style={styles.container}>
                <Text>{this.state.timerTitle}：{this.state.codeTime}</Text>
                <ProgressViewIOS style={{ marginTop: 20, width: 300, marginBottom: 20 }} progress={this.state.percent}
                    progressTintColor={'#ff0000'}

                    trackTintColor={'#9ddddd'} />
                <Surface width={300} height={300}>
                    <Group>
                        <Shape d={path} stroke='#dddddd' fill='#dddddd' strokeWigth={1} />
                        <Shape d={path3} stroke='#dddddd' fill='#de2314' strokeWigth={1} />
                        <Shape d={path2} stroke='#dddddd' fill='#f5FCFF' strokeWigth={1} />
                        <Shape d={path4} stroke='#dddddd' fill='#de2413' strokeWigth={1} />
                    </Group>


                </Surface>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,

    }

});