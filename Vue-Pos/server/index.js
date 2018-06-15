const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const route = require('./routes')
const config = require('config-lite')(__dirname)

app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, '../dist')))

app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With, X-HTTP-Method-Override, Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        console.log('aaa+++');
        res.send(200)
        // next()  
    } else {
      next()
    }
});

app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}))

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true// 保留后缀
}))

route(app)

app.listen(config.port, function () {
    console.log('开启', config.port, '端口的服务');
})

