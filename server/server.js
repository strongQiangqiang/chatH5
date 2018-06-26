// 后台文件配置
const express = require('express')
const userRouter = require('./user')
// 做post请求需要的中间件
const bodyParser = require('body-parser')
// 做cookie需要的中间件
const cookieParser = require('cookie-parser')
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

// 下面本来的app.listen如果个socket配合使用就需要改成server.listen
// app.listen(9093, function() {
server.listen(9093, function() {
  console.log('Node app start at port 9093')
})
