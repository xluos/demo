const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const UserModel = require('../models/users')
// 获取所有用户请求
router.get('/', checkLogin, function(req, res) {
    UserModel.find().then((msg)=> {
        res.send(msg)
    }).catch((e)=>{
        res.send(e);
    })
})
router.get('/query', checkLogin, function(req, res) {
    var type = req.query.type;
    var val = req.query.val;
    UserModel.getUsersByTypeVal(type, val).then((msg)=> {
        res.send(msg)
    }).catch((e)=>{
        res.send(e);
    })
})
// 创建用户请求
router.post('/', checkLogin, function(req, res) {
    user = req.fields;
    UserModel.create(user).then((users)=>{
        console.log(users);
        
        res.send({status: true, message: "创建用户成功"});
        
    }).catch((e)=>{
        console.log(e);
        
        res.send({status: false, message: "插入失败,请检查数据"});
    })
})
// 修改用户请求
router.put('/', checkLogin, function(req, res) {
    user = req.fields;

    UserModel.update(req.fields._id, user).then((msg)=>{
        res.json({status: true, message: '修改成功'});
    }).catch((e)=>{
        res.json({status: false, message: '修改失败'});
    })
})
// 删除用户请求
router.delete('/:id', checkLogin, function(req, res) {
    var id = req.params.id;
    
    UserModel.delete(id).then((msg)=>{
        res.json({ status: true, message: "删除成功", data:msg});
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})

module.exports = router