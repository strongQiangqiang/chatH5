/*
* 个人中心页面
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

@connect(
  state=>state.user,
  { logoutSubmit }
)

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  logout = () => {
    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        // 这里用browser-cookies插件清除cookie
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      } },
    ])
  }
  render() {
    console.log(this.props)
    const { redirectTo, avatar, user, type, company, title, desc, money } = this.props
    return (
      user ? (
        <div>
          <Result
            img={
              <img
                alt=''
                style={{ width: 50 }}
                src={require(`../img/${avatar}.png`)}
              />
            }
            title={user}
            message={type === 'boss' ? company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item
              multipleLine
            >
              {title}
              {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {money ? <Brief>薪资:{money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace/>
          <List>
            <Item onClick={this.logout}>退出登录</Item>
          </List>
        </div>
      ) : <Redirect to={redirectTo} />
    )
  }
}

export default User
