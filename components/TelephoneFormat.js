/**
 * Example.js定义了一个Example子组件
 * 
 */
import React, { Component, createRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

export default class TelephoneFormat extends Component {
    //组件默认值
    static defaultProps = {
        isDefault: true, // 格式,代表默认或分段
        isSecret: false, // 是否加密
        maxLength: 11,// 根据格式给限制长度
        mode: 'hideHead', // 加密模式seg1:xxx12345678, seg2:123xxxx5678, seg3:1234567xxxx

    };

    static propTypes = {
        isDefault: PropTypes.bool.isRequired,
        maxLength: PropTypes.number,
        isSecret: PropTypes.bool,
        // 枚举类型，指定特定的值,只能是其中之一
        mode: PropTypes.oneOf(['hideHead', 'hideMiddle', 'hideTail']),
    };

    constructor(props) {
        super(props);
        //初始化state
        this.state = {
            inputValue: '',
            resultNum: '',
        };

        // 创建一个 ref 来存储 textInput 的 DOM 元素
        //this.textInput = createRef();
        //this.focusTextInput = this.focusTextInput.bind(this);
    }

    componentDidMount() {
        console.log('子组件挂载完毕')
    }

    /*
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
         console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
          console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
          return true;
    }
    componentWillUpdate(nextProps, nextState) {
          console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
          console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
    */

    focusTextInput() {
        // 直接使用原生 API 使 text 输入框获得焦点
        // 注意：我们通过 "current" 来访问 DOM 节点
        //this.textInput.current.focus();
    }

    /**
     * 处理输入的数字函数，根据参数格式化数字
     * 此语法确保’numFormat‘内的’this‘已被绑定
    */
    numFormat = (text) => {
        //const newText = text.replace(/[^\d]+/, '');
        let str = '';
        //可以打印看看是否过滤掉了非数字
        //调用setState方法修改state
        //let length = newText.substring().length;
        //text.replace(/[^\d]+/, '').replace(/[^\d]/g, '') 每次加了空格后去除空格，所以要去两次
        //let str = newText.replace(/[^\d]+/, '').replace(/[^\d]/g, '').replace(/([\d]{4})(?=[\d])/g, '$1 ');
        console.log(text.replace(/(\d{3})(\d{4})(\d{4})/g));
        this.setState({ resultNum: text.replace(/[^\d]+/, '') });

        //传递值给父组件
        //this.props.getResult(this.state.resultNum); 传state里面的值会延迟一位数
        this.props.getResult(text.replace(/[^\d]+/, ''), this.props.name);
        if (this.props.isSecret) { // 加密
            if (this.props.mode == 'hideHead') { // 加密分段一
                if (this.props.isDefault) {
                    str = text.replace(/(\d{3})(\d{8})/g, "***$2");
                }
                else {

                    str = text.replace(/(\d{3})(\d{4})(\d{4})/g, "*** $2 $3");
                }
            } else if (this.props.mode == 'hideMiddle') { // 加密分段二
                if (this.props.isDefault) {
                    str = text.replace(/(\d{3})(\d{4})(\d{4})/g, "$1****$3");
                }
                else {
                    str = text.replace(/[^\d]+/, '').replace(/[^\d]/g, '').replace(/(\d{3})(\d{4})(\d{4})/g, "$1 **** $3");
                }
            } else { // 加密分段三
                if (this.props.isDefault) {
                    str = text.replace(/(\d{7})(\d{4})/g, "$1****");
                }
                else {
                    str = text.replace(/[^\d]+/, '').replace(/[^\d]/g, '').replace(/(\d{3})(\d{4})(\d{4})/g, "$1 $2 ****");
                }
            }
        }
        else { // 不加密
            if (this.props.isDefault) {
                str = text.replace(/[^\d]+/, '');

            }
            else {
                /**str = text.replace(/[^\d]+/, '').replace(/[^\d]/g, '').replace(/(\d{ 3})(\d{ 4})(\d{ 4}) / g, "$1 $2 $3"); 
                 * 上面代码需要全部输入完才会变格式，加密的全部输入完再删除，有bug 暂时还没找到解决办法
                 * 改进：不用全部输完再变格式了，用户体验更好
                */
                text = text.replace(/\D/g, '').substring(0, 11);
                const valueLen = text.length;
                if (valueLen > 3 && valueLen < 8) {
                    text = `${text.substr(0, 3)} ${text.substr(3)}`;
                } else if (valueLen >= 8) {
                    text = `${text.substr(0, 3)} ${text.substr(3, 4)} ${text.substr(7)}`;
                }
                str = text;

            }
        }
        return str;
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    //ref={this.textInput}
                    style={styles.inputStyle}
                    maxLength={this.props.maxLength}
                    placeholder='18100000000'
                    keyboardAppearance={'light'}
                    keyboardType={'numeric'}

                    onChangeText={(text) => {
                        //测试setState的第二个参数
                        //该函数会在setState函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成

                        this.setState({ inputValue: this.numFormat(text) }, () => console.log('这是回调函数'));
                    }}
                    value={this.state.inputValue}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5FCFF',
    },
    inputStyle: {
        width: 200,
        height: 40,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#06aaff",
        borderRadius: 2,
    }
});
