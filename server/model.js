//  mongoose的控制
// 引入 mongoose库，就是，mongodb
const mongoose = require('mongoose')

// 链接mongo, 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
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
    'money': { type: String }
  },
  chat: {

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