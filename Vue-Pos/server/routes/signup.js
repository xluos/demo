const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const AdminModel = require('../models/admin')

// 注册帐号
router.post('/', checkNotLogin, function(req, res){
    var user = {
        name: req.fields.id,
        password: req.fields.pwd
    }
    AdminModel.create(user).then(function(result) {
        console.log(result);
        req.session.user = user;
        res.json({status: true, message: "注册成功"});
    }).catch(function(e){
        console.log(e);
        if (e.errmsg.match('duplicate key')) {
            res.json({status: false, message: 'error'+'用户名已被占用'})
        }
    })
})

module.exports = router