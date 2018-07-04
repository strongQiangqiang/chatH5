// 后台文件配置
import express from 'express'
import path from 'path'
// const express = require('express')
const userRouter = require('./user')
// 做post请求需要的中间件
const bodyParser = require('body-parser')
// 做cookie需要的中间件
const cookieParser = require('cookie-parser')
/*----------------做服React的务端渲染Start---------------------*/
// 服务号支持css,然后新建文件cmrh,做钩子函数，所以要放到前面
import csshook from 'css-modules-require-hook/preset'
// 服务端支持图片
import assethook from 'asset-require-hook'
assethook({
  extensions: ['png']
})
import React from 'react'
import { Provider } from 'react-redux'
// 开始用使用Router4服务端的StaticRouter
import { StaticRouter } from 'react-router-dom'
// 引入redux,applyMiddleware是处理中间件的,compose是用来组合函数的
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import staticPath from '../build/asset-manifest.json'
import App from '../src/app'
import reducers from '../src/reducer'
/*----------------做服React的务端渲染End---------------------*/
// 获取数据库数据
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
// 新建app
const app = express()
/*----------------socket代码Start---------------------*/
// work with express
// 如果想合express配合，需要socket.io和http统一起来
const server = require('http').Server(app)
const io = require('socket.io')(server)
// io是全局的,on是监听，emit是发送
io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    console.log(data)
    const { from, to, msg } = data
    // 用sort().join('_')把聊天人id链接到一起变成唯一id
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})
/*----------------socket代码End---------------------*/

// 使用bodyParser来解析post过来的json
app.use(bodyParser.json())
// 使用cookieparser来解析cookie
app.use(cookieParser())

// app.use就是开启一个中间件，如果中间件是一个路由，就先输入一个前缀
app.use('/user', userRouter)

/* 
  打包后要把所有请求拦截,只要是这个地址的把我们的build
  设置为静态资源地址，express里面有专门的接口，我们吧所有的
  都拦截了，通过中间件的形式做一些转发，做一些白名单，用nodejs
  自带的path来解决相对路径的问题
*/
/*----------------做服React的务端渲染Start---------------------*/
// 写一个中间件
app.use(function(req, res, next) {
  // 这里做一个白名单
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  let context = {}
  res.write(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <title>haha</title>
          <link rel="stylesheet" href="/${staticPath['main.css']}">
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div id="root">`)
  // 用react16新的renderToNodeStream，解析成流的状态渲染
  const markupStream = renderToNodeStream(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )
  markupStream.pipe(res, {end: false})
  markupStream.on('end', () => {
    res.write(
      `</div>
        </body>
        <script src="/${staticPath['main.js']}"></script>
      </html>`
    )
    res.end()
  })
  // const htmlRes = (<App></App>)
  res.send(pageHtml)
  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
/*----------------做服React的务端渲染End---------------------*/
// 下面本来的app.listen如果个socket配合使用就需要改成server.listen
// app.listen(9093, function() {
server.listen(9093, function() {
  console.log('Node app start at port 9093')
})
