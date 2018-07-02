/**
 * mongodb
 */
const mongoose = require('mongoose')
// 链接mongo
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
  user:{
    'user':{'type':String,'require':true},
    'pwd':{'type':String,'require':true},
    'type':{'type':String,'require':true},
    'avatar':{'type':String},
    'desc':{'type':String},
    'title':{'type':String},
    'company':{'type':String},
    'money':{'type':String}
  },
  chat:{

  }
}
// 批量的建立model实例
for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}
// 当连接成功的时候的操作
mongoose.connection.on('connected', function () {
  console.log('mongo connect success!')
})

module.exports = {
  getModel:function(name) {
    return mongoose.model(name)
  }
}