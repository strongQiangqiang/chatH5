// 组件只获取用户信息，做一些简单的跳转
import { Component } from 'react'
import axios from 'axios'
import { loadData } from '../../redux/user.redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
// 这里connect一定要写在withRouter下面
@connect(
  null,
  { loadData }
)
class AuthRoute extends Component {
  componentDidMount() {
    // 判断是否在登录页面
    const publicList = ['/login', 'register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then(res => {
      // console.log(res)
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息的
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
          console.log(this.props)
        }
      }
    })
  }
  render() {
    return null
  }
}

export default AuthRoute
