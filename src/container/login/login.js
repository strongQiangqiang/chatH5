import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
 
@connect(
  state => state.user,
  {login}
)

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.is = this.is.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleChange(key, val) {
    this.setState({
      [key]:val
    })
  }
  // 点击登录
  handleLogin() {
    this.props.login(this.state)
  }
  is(str) {
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <h2>我是登录页1</h2>
        <WingBlank>
          <List>
            { this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : '' }
            <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
            <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
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
