const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

// 新建app
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
// 监听9999端口
app.listen(9999,function(){
    console.log('Node app start at port 9999')
})

app.get('/',function(req,res){
    res.send("<h1>hello express</h1>")
})

