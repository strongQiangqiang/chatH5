//  mongoose的控制
// 引入 mongoose库，就是，mongodb
const mongoose = require('mongoose')

// 链接mongo, 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
  // 用户信息
  user: {
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    // 头像,通过头像字段判断用户是否完成信息
    'avatar': { type: String },
    // 个人简介或者职位简介
    'desc': { type: String },
    // 职位名
    'title': { type: String },
    // 如果你是boss还有两个字段
    'company': { type: String },
    // 薪资字段
    'money': { type: String }
  },
  // 聊天信息
  chat: {
    // 两个人发送内容是在一起的，每个聊天唯一的标识
    'chatid': { type: String, require: true },
    'from': { type: String, require: true },
    'to': { type: String, require: true },
    // 信息是否已读
    'read': { type: Boolean, require: false },
    // 聊天内容
    'content': { type: String, require: true, default: '' },
    // 发送时间
    'create_time': { type: Number, default: new Date().getTime() },
  }
}

// 批量动态生成
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    // 返回查询表的内容
    return mongoose.model(name)
  }
}