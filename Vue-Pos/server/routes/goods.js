const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const GoodsModel = require('../models/goods')

// 创建
router.post('/', checkLogin, function(req, res) {
    var goods = req.fields
    GoodsModel.create(goods).then((msg)=>{
        res.json({status: true, message: "提交成功!"});
    }).catch((e)=>{
        res.json({status: false, message:e})
    })
})
// 上传图片
router.post('/img', checkLogin, function(req, res) {
    res.send(req.files.file.path)
})

// 获取全部商品列表
router.get('/all', checkLogin, function(req, res) {
    GoodsModel.getGoodsAll().then((msg)=>{
        console.log(msg);
        res.json({ status: true, message: "成功!", data: msg})
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})

router.get('/sale', checkLogin, function(req, res) {
    GoodsModel.getGoodsSale().then((msg)=>{
        console.log(msg);
        res.json({ status: true, message: "成功!", data: msg})
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})

router.get('/out', checkLogin, function(req, res) {
    GoodsModel.getGoodsOut().then((msg)=>{
        console.log(msg);
        res.json({ status: true, message: "成功!", data: msg})
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})
module.exports = router