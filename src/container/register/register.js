import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'

const RadioItem = Radio.RadioItem
@connect(
  state => state.user,
  { register }
)

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '', // 账号
      pwd: '', // 密码
      repeatpwd: '', // 确认密码
      type: 'genius' // Boss
    }
    this.handRegister = this.handRegister.bind(this)
  }
  handleChange(key, val) {
    this.setState({
      [key]:val
    })
  }
  handRegister() {
    this.props.register(this.state)
    console.log(this.state)
  }
  render() {
    const { type } = this.state
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <List>
          { this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : '' }
          <InputItem
            onChange={v => this.handleChange('user', v)}
          >用户</InputItem>
          <WhiteSpace />
          <InputItem
            type = 'password'
            onChange={v => this.handleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            type = 'password'
            onChange={v => this.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
            checked={ type === 'genius' }
            onChange={() => this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={ type === 'boss' }
            onChange={() => this.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace />
          <Button type='primary' onClick={this.handRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register
