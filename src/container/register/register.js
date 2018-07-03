import React, { Component } from 'react'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import Logo from '../../component/logo/logo'
import imoocFrom from '../../component/imooc-form/imooc-form'

const RadioItem = Radio.RadioItem
@connect(
  state => state.user,
  { register }
)
@imoocFrom
class Register extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '', // 账号
    //   pwd: '', // 密码
    //   repeatpwd: '', // 确认密码
    //   type: 'genius' // Boss
    // }
    this.handRegister = this.handRegister.bind(this)
  }
  componentDidMount() {
    // 这里因为有默认值，用高阶组件的时候要在didmount里面设置下
    this.props.handleChange('type', 'genius')
  }
  handRegister() {
    this.props.register(this.props.state)
    console.log(this.props.state)
  }
  render() {
    const { redirectTo, msg, state } = this.props
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={redirectTo} /> : null}
        <Logo></Logo>
        <List>
          { msg ? <p className='error-msg'>{msg}</p> : '' }
          <InputItem
            onChange={v => this.props.handleChange('user', v)}
          >用户</InputItem>
          <WhiteSpace />
          <InputItem
            type = 'password'
            onChange={v => this.props.handleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            type = 'password'
            onChange={v => this.props.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
            checked={ state.type === 'genius' }
            onChange={() => this.props.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={ state.type === 'boss' }
            onChange={() => this.props.handleChange('type', 'boss')}
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
