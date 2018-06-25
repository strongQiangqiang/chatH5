// 登录页面
import React, { Component } from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import Logo from 'Component/logo/logo'
import imoocFrom from 'Component/imooc-form/imooc-form'

// 高阶组件的理解，函数当参数和函数当返回值
/*
function hello() {
  console.log('hello')
}
function wrapperHello(fn) {
  return function() {
    console.log('before say hello')
    fn()
    console.log('after say hello')
  }
}
hello = wrapperHello(hello)
hello()
*/

// 可以当做引的外部组件
function WrapperHello(Comp) {
  class WrapComp extends React.Component{
    render() {
      return (
        <div>
          <p>这是HOC高阶组件特有的元素</p>
          <Comp { ...this.props }></Comp>
        </div>
      )
    }
  }
  /*
    // 反向继承，可以做渲染劫持
    class WrapComp extends Comp{
      componentDidMount() {
        console.log('高阶组件新增的生命周期，加载完成')
      }
      render() {
        return <Comp />
      }
    }
  */
  return WrapComp
}
// 其实所谓的高阶组件就是给一个组件,返回另外一个组件,另外一个组件吧原来的组件包裹一层，这样我们就在原有的基础上可以添加或者增强一些东西
// 主要有两种功能的高阶组件，使用高阶组件具体的作用就是代码复用，逻辑抽象
// 第一种叫属性代理:我们可以个上面Comp加任意的属性，也可以在Comp上面或者下面添加任意的元素
// 第二种叫反向继承
@WrapperHello
class Hello extends React.Component{
  render() {
    return <h2>hello haha I love</h2>
  }
}
// Hello = WrapperHello(Hello)

@connect(
  state => state.user,
  {login}
)
// 这里我们用高阶组件包裹下
@imoocFrom
class Login extends Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  // 点击登录
  handleLogin() {
    this.props.login(this.props.state)
  }
  is(str) {
  }
  render() {
    const { redirectTo, msg } = this.props
    return (
      <div>
        {redirectTo && redirectTo !== '/login' ? <Redirect to={redirectTo} /> : null}
        <Logo></Logo>
        <h2>我是登录页</h2>
        <WingBlank>
          <List>
            { msg ? <p className='error-msg'>{msg}</p> : '' }
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type='primary'>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
