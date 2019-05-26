import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props);
    //取消黄色警告
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!helloworld</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
