import React, { Component, createRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
//导入自定义组件
import TelephoneFormat from '../components/TelephoneFormat.js';

export default class App extends Component {

  //配置

  constructor(props) {
    super(props);
    //取消黄色警告
    console.disableYellowBox = true;
    //this.textInput = createRef();
    this.state = {
      changeVal: '',
      name: ''
    };

  }


  handleChange = (val, name) => {
    //val就是父组件希望得到的值
    this.setState({
      changeVal: val,
      name: name
    });
  }

  componentDidMount() {
    console.log('父组件挂载完毕')
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}

        //keyboardShouldPersistTaps='never'
        //keyboardDismissMode='on-drag' 
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      >
        <View style={styles.container}>
          <Text >
            父组件中 {this.state.name}
          </Text>
          <Text >
            非展示数据 {this.state.changeVal}
          </Text>
          <TelephoneFormat name="默认格式不加密" getResult={(val, name) => {
            this.handleChange(val, name)
          }}></TelephoneFormat>
          <TelephoneFormat name="默认格式加密前三位" isSecret={true} getResult={(val, name) => { this.handleChange(val, name) }} ></TelephoneFormat>
          <TelephoneFormat name="默认格式加密中间四位" isSecret={true} mode="hideMiddle" getResult={(val, name) => { this.handleChange(val, name) }} ></TelephoneFormat>
          <TelephoneFormat name="默认格式加密后四位" isDefault={true} isSecret={true} mode="hideTail" getResult={(val, name) => { this.handleChange(val, name) }} ></TelephoneFormat>
          <TelephoneFormat name="分段格式不加密" isDefault={false} maxLength={13} getResult={(val, name) => { this.handleChange(val, name) }} ></TelephoneFormat>
          <TelephoneFormat name="分段格式加密前三位" isDefault={false} isSecret={true} maxLength={13} getResult={(val, name) => { this.handleChange(val, name) }}
          ></TelephoneFormat>
          <TelephoneFormat name="分段格式加密中间四位" isDefault={false} isSecret={true} maxLength={13} mode="hideMiddle" getResult={(val, name) => { this.handleChange(val, name) }}></TelephoneFormat>
          <TelephoneFormat name="分段格式加密后四位" isDefault={false} isSecret={true} maxLength={13} mode="hideTail" getResult={(val, name) => { this.handleChange(val, name) }}
          //ref = {this.textInput}
          ></TelephoneFormat>
          <Text style={styles.welcome}>Demo页面</Text>
        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5FCFF',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5FCFF',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});