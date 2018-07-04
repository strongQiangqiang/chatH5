import React from 'react'
import ReactDom from 'react-dom'
import App from './app'
// 开始用使用Router4
import { BrowserRouter } from 'react-router-dom'
// 引入redux,applyMiddleware是处理中间件的,compose是用来组合函数的
import { createStore, applyMiddleware, compose } from 'redux'
// 引入中间件redux-thunk,用来异步加载action
import thunk from 'redux-thunk'
// 用react-redux来优化
import { Provider } from 'react-redux'
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

// boss genius me msg 4个页面
ReactDom.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
