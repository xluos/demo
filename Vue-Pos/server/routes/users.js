const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const UserModel = require('../models/users')
// 获取所有用户请求
router.get('/', checkLogin, function(req, res) {
    UserModel.find().then((msg)=> {
        res.send(msg)
    }).catch((e)=>{
        console.log(e);
        res.send(e);
    })
})
// 创建用户请求
router.post('/', checkLogin, function(req, res) {
    user = {
        name: req.fields.name,
        tel: req.fields.tel,
        wx: req.fields.wx,
        integral: parseFloat(req.fields.integral),
        sumintegral: parseFloat(req.fields.sumintegral),

        grade: parseFloat(req.fields.grade),
        balance: parseFloat(req.fields.balance),
        lasttime: req.fields.lasttime
    };
    UserModel.create(user).then((users)=>{
        console.log('-----------------------');
        console.log('-----------------------');
        console.log('-----------------------');
        
        console.log(users);
        res.send({status: true, message: 'true'});
        
    }).catch((e)=>{
        console.log('+++++++++++++++++++++++');
        console.log('+++++++++++++++++++++++');
        console.log('+++++++++++++++++++++++');
        
        console.log(e);

        res.send({status: false, message: 'false'});
    })
})
// 修改用户请求
router.put('/', checkLogin, function(req, res) {
    user = {
        name: req.fields.name,
        tel: req.fields.tel,
        wx: req.fields.wx,
        integral: parseFloat(req.fields.integral),
        sumintegral: parseFloat(req.fields.sumintegral),
        grade: parseFloat(req.fields.grade),
        balance: parseFloat(req.fields.balance),
        lasttime: req.fields.lasttime
    };
    UserModel.update(req.fields._id, user).then((res)=>{
        console.log(res);
        
    }).catch((e)=>{
        console.log(e);
        
    })
})

module.exports = router