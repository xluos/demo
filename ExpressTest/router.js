const express = require('express');
const app = express();
const birds = require('./birds.js')

app.get('/', function (req, res) {
    res.send("hello world");
})

app.get('/readme', function (req, res) {
    res.send('readme.md')
})

app.get('/error', function (req, res) {
    res.send();
})

app.get('/example/b', function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
  }, function (req, res) {
    res.send('Hello from B!');
});

app.use('/birds', birds);


// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由
    if (req.params.id == 0) next('route');
    // 否则将控制权交给栈中下一个中间件
    else res.send('常规页面'),next(); //
  }, function (req, res, next) {
    // 渲染常规页面
    console.log("aaa");
    
  });
  
  // 处理 /user/:id， 渲染一个特殊页面
  app.get('/user/:id', function (req, res, next) {
    res.send('特殊页面');
  });


app.listen(3000);