// 后台文件配置
const express = require('express')
const userRouter = require('./user')
// 做post请求需要的中间件
const bodyParser = require('body-parser')
// 做cookie需要的中间件
const cookieParser = require('cookie-parser')


// 新建app
const app = express()

// 使用bodyParser来解析post过来的json
app.use(bodyParser.json())
// 使用cookieparser来解析cookie
app.use(cookieParser())

// app.use就是开启一个中间件，如果中间件是一个路由，就先输入一个前缀
app.use('/user', userRouter)

app.listen(9093, function() {
  console.log('Node app start at port 9093')
})
