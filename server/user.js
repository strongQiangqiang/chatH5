// 用户相关的接口
const express = require('express')
// 引入数据加密的插件
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
// 这里定义接口返回参数一部分不显示的值
const _filter = {'pwd': 0, '__v': 0}

// 调试的用户列表接口
Router.get('/list', function(req, res) {
  // get 用req.query获取，post用req.body获取
  const { type } = req.query
  // User.remove({}, function(e, d) {})
  User.find({type}, function(err, doc) {
    // 不能直接返回doc，要偶先参会code为0
    return res.json({ code: 0, data: doc })
  })
})
// 接受参数接口
Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  // 效验cookie
  if (!userid) {
    return res.json.dumps({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})
// 登录接口
Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  // findOne第一个参数是查询条件，第二个是接口返回值
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或者密码错误' })
    }
    // 这里设置cookie
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})
// 注册接口
Router.post('/register', function(req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function(err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    // 这里用save获取id
    const userModel = new User({ user, pwd: md5Pwd(pwd), type  })
    userModel.save(function(e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了'})
      }
      const { user, type, _id } = d
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { user, type, _id } })
    })
    // 这里保存密码的时候需要加密保存
    // User.create({ user, pwd: md5Pwd(pwd), type }, function(e, d) {
    //   if (e) {
    //     return res.json({code: 1, msg: '后端出错了'})
    //   }
    //   return res.json({code: 0})
    // })
  })
})

Router.get('/info', function(req, res) {
  // 检查用户有没有cookie
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})

// 这里给密码添加密文。常用的方法
function md5Pwd(pwd) {
  // 定义密文
  const salt = 'imooc_is_good_3958x8yza6!@#IuUHJ~~'
  // 这里定义两次MD5的加密
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
