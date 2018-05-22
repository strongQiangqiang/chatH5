import React from 'react'
import ReactDom from 'react-dom'
// 引入redux,applyMiddleware是处理中间件的,compose是用来组合函数的
import { createStore, applyMiddleware, compose } from 'redux'
// 引入中间件redux-thunk,用来异步加载action
import thunk from 'redux-thunk'
// 用react-redux来优化
import { Provider } from 'react-redux'

// 开始用使用Router4
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import Login from './container/login/login'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Register from './container/register/register'
import Dashboard from './container/dashboard/dashboard'
import AuthRoute from 'Component/authroute/authroute'

// 这里使用合并后的reducer
import reducers from './reducer'
import './config'
import './index.css'
// 这里判断环境是否开启redux的插件
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : h => h

//创建store,第二个参数是开启中间件
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools
))

function Boss() {
  return <h2>Boss页面</h2>
}

// boss genius me msg 4个页面
ReactDom.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        {/* Switch，只渲染命中的第一个子Router组件； */}
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path='/boss' component={Boss}></Route>
            <Route path='/bossinfo' component={BossInfo}></Route>
            <Route path='/geniusinfo' component={GeniusInfo}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
