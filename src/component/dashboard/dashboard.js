// 路由没有命中跳转的页面比如404
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from 'Component/navlink/navlink'
import Boss from 'Component/boss/boss'
import Genius from 'Component/genius/genius'
import User from 'Component/user/user'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

function Msg() {
  return <h1>消息列表首页</h1>
}
@connect(
  state => state,
  { getMsgList, recvMsg }
)

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    // 获取消息列表数据
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header'  mode='dard'>
          { 
            navList.find(v => v.path === pathname).title
          }
        </NavBar>
        <div>
          <Switch>
            {
              navList.map(v => (
                <Route key={v.path} path={v.path} component={v.component}></Route>
              ))
            }
          </Switch>
        </div>
        <NavLinkBar
          data={navList}
        />
      </div>
    )
  }
}

export default Dashboard