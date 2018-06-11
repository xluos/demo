const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const UserModel = require('../models/users.js')
router.get('/', checkLogin, function(req, res) {
    req.session.user = null;
    res.json({status: true, message: "注销成功"})
})

router.post('/', checkNotLogin,function(req, res) {
    const name = req.fields.id;
    console.log(req.fields);
    if(req.fields.id === '') {
        res.json({status: true, message: "不能为空"});
    }
    UserModel.getUserByName(name).then(function(result) {
        console.log('---------------------------------------------------------');
        console.log('---------------------------------------------------------');
        console.log('---------------------------------------------------------');
        console.log('---------------------------------------------------------');
        console.log(result);
        if(!result) {
            res.json({status: false, message: "无此用户"});
        }
        if(result.password === req.fields.pwd) {
            res.sission.user = result;
            res.json({status: true, message: "登录成功"});
        } else {
            res.json({status: false, message: "登录失败"});
        }
    }).catch(function(e){
        console.log(e);
        res.json({status: false, message: "错误"});
    })
})

router.get('/status', function(req, res) {
    if(req.session.user) {
        res.json({status: true, message: '登录状态'})
    } else {
        res.json({status: true, message: '非登录状态'})        
    }
})
module.exports = router