// boss首页
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from 'Component/usercard/usercard'

const Header = Card.Header
const Body = Card.Body
@connect(
  state => state.chatuser,
  { getUserList }
)

class Boss extends Component { 
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    return (
      <UserCard userlist={this.props.userlist}></UserCard>
    )
  }
}

export default Boss
