// 路由没有命中跳转的页面比如404
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

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
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
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
    let pages = navList.find(v => v.path === pathname)
    const page = pages ? pages : navList[3]
    return (
      <div>
        <NavBar className='fixd-header'  mode='dard'>
          { page.title }
        </NavBar>
        <div>
          {/* 让动画生效，之渲染一个Router，根据当前的path决定组件 */}
          <QueueAnim type='scaleX' duration={800}>
            <Route path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard