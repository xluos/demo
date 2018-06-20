const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const AdminModel = require('../models/admin.js')
// 注销登录状态
router.get('/', checkLogin, function(req, res) {
    req.session.user = null;
    res.json({status: true, message: "注销成功"})
})
// 登录帐号
router.post('/', checkNotLogin,function(req, res) {
    const name = req.fields.id;
    // console.log(req.fields);
    if(req.fields.id === '') {
        res.json({status: false, message: "不能为空"});
    }
    AdminModel.getUserByName(name).then((result) => {
        if(!result) {
            res.json({status: false, message: "无此用户"});
        }
        if(result.password === req.fields.pwd) {
            req.session.user = result;
            
            res.json({status: true, message: "登录成功"});
        } else {
            res.json({status: false, message: "登录失败"});
        }
    }).catch(function(e){
        res.json({status: false, message: "错误"});
    })
})
// 修改密码
router.put('/', checkLogin, function(req, res) {
    const name = req.session.user.name;
    // console.log(req.fields);
    if(req.fields.id === '') {
        res.json({status: false, message: "不能为空"});
    }
    AdminModel.getUserByName(name).then((result) => {
        if(!result) {
            res.json({status: false, message: "无此用户"});
        }
        if(result.password === req.fields.old) {
            AdminModel.update(req.session.user.name, req.fields.new)
                        .then((result) => {

                            req.session.user = null;
                            res.json({status: true, message: "修改成功"});
                        })
                        .catch((e) => {
                            
                            res.json({status: false, message: "修改失败"});
                        })
            
        } else {
            res.json({status: false, message: "密码错误"});
        }
    }).catch(function(e){
        res.json({status: false, message: "错误"});
    })
})
// 查询登录状态
router.get('/status', function(req, res) {
    if(req.session.user) {
        res.json({status: true, message: '登录状态'})
    } else {
        res.json({status: false, message: '非登录状态'})        
    }
})
module.exports = router