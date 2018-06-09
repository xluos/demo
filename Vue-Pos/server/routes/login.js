const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const checkNotLogin = require('../middlewares/check.js').checkNotLogin

router.get('/', checkLogin, function(req, res) {
    req.session.user = null;
    res.json({status: true, message: "注销成功"})
})

router.post('/', checkNotLogin,function(req, res) {
    console.log(req.fields);
    if(req.fields.id === '') {
        res.json({status: true, message: "不能为空"});
    }else if(req.fields.id === req.fields.pwd) {
        req.session.user = req.fields.id;
        res.json({status: true, message: "登录成功"});
    } else {
        res.json({status: true, message: "密码错误"});
    }
    
})

router.get('/status', function(req, res) {
    if(req.session.user) {
        res.json({status: true, message: '登录状态'})
    } else {
        res.json({status: true, message: '非登录状态'})        
    }
})
module.exports = router