import React from 'react'
// 开始用使用Router4
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
import Chat from './component/chat/chat'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  // 可以捕捉到错误
  componentDidCatch(err, info) {
    console.log(err, info)
    this.setState({
      hasError: true
    })
  }
  render() {
    const { hasError } = this.state
    return (
      hasError ? (<h2>页面出错了</h2>) : (
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            {/* <Route path='/' component={Login}></Route> */}
            <Route path='/bossinfo' component={BossInfo}></Route>
            <Route path='/geniusinfo' component={GeniusInfo}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/chat/:user' component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      )
    )
  }
}

export default App