// 路由没有命中跳转的页面比如404
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from 'Component/navlink/navlink'
import Boss from 'Component/boss/boss'

function Genius() {
  return <h1>牛人首页</h1>
}
function Msg() {
  return <h1>消息列表首页</h1>
}
function User() {
  return <h1>个人中心</h1>
}
@connect(
  state => state
)

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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
        <div style={{ marginTop: 45}}>
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