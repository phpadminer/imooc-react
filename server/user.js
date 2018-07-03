const express = require('express')
const Router = express.Router()
// 引入mongodb
const models = require('./model')
const User = models.getModel('user')
// 加密第三方库
const utils = require('utility')

// 查询时限制不显示的字段名单
const _filters = {'pwd':0,'__v':0}

// 获取所有的用户信息
Router.get('/list',function(req,res){
  // User.remove({},function(err,doc){})
  User.find({},function (err,doc) {
    return res.json(doc)
  })
})

// 注册功能
Router.post('/register', function (req, res) {
  console.log(req.body)
  // 将获取到的数据赋值
  const {user,pwd,type} = req.body
  // 先看一下数据库中是否有重复的
  User.findOne({user},function(err,doc){
    // console.log(doc)
    // 如果有重复的
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    // 没有的话就创建一个
    User.create({user,pwd: md5Pwd(pwd),type}, function (e, d) {
      if (e) {
        return res.json({code: 1,msg: '后端出错了'})
      }
      return res.json({code:0})
    })
  })
})
// 登录路由
Router.post('/login',function (req,res){
  const {user,pwd} = req.body
  console.log(md5Pwd(pwd))
  User.findOne({user,'pwd':md5Pwd(pwd)},_filters, function (err,doc){

    if(!doc){
      return res.json({code:1,msg:'用户名不存在或密码错误'} )
    }
    // 如果密码和用户名都正确，那么就保存cookie
      res.cookie('userid',doc._id)
      return res.json({code:0,data:doc})
      // 老吴的新思路
      //   const result = {
      //    code:1,
      //    msg: [[['密码错误',1], [false,0]], '用户名不存在'][Number(doc == null)]
      //   }
      //   if (result.msg.constructor == Array) {
      //     let r=Number(doc.pwd == md5Pwd(pwd));
      //     result.msg = result.msg[r][0];
      //     result.code = result.msg[r][1];
      //   }
      //   return res.json(result);

  })
})
// 用来检查用户是否登录 如果登录的话就返回用户的信息
Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1,msg:'还没有登录'})
  }
  User.findOne({_id:userid},_filters,function (err,doc) {
      if(err){
        return res.json({code:1,msg:'后端出错了'})
      }
      if(doc){
        return res.json({code:0,data:doc})
      }
    })
})

Router.post('/update',function(req,res){
  // 首先先验证是否登录,这里之所以要验证请求
  console.log(req.body)
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1,msg:'还没有登录'})
  }
  User.findByIdAndUpdate(userid,req.body,function(err,doc){
    // 对象合并 https://blog.csdn.net/qq_30100043/article/details/53422657

    const data = Object.assign({},{
      user: req.body.user,
      type: req.body.type,
    }, req.body)
    // console.log(data)
    return res.json({data,code:0})
  })
})

/**
 * 密码加密 加盐md5
 * @param {密码明文} pwd
 */
function md5Pwd(pwd) {
  const salt = 'helloreact123_'
  return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router

