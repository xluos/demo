const express = require('express')
const router = express.Router()
const path = require('path')
const checkLogin = require('../middlewares/check.js').checkLogin
const GoodsModel = require('../models/goods')
const StatisticalModel = require('../models/statistical')

// 创建
router.post('/', checkLogin, function(req, res) {
    var goods = req.fields
    GoodsModel.create(goods).then((msg)=>{
        res.json({status: true, message: "提交成功!"});
    }).catch((e)=>{
        res.json({status: false, message:e})
    })
})
//修改
router.put('/', checkLogin, function(req, res) {
    var goods = req.fields
    GoodsModel.update(goods).then((msg)=>{
        console.log(msg);
        
        res.json({status: true, message: "提交成功!", data: msg});
    }).catch((e)=>{
        res.json({status: false, message:e})
    })
})
// 上传图片
router.post('/img', checkLogin, function(req, res) {
    
    res.send(req.files.file.path.split(path.sep).pop())
    
})

// 获取全部商品列表
router.get('/all', checkLogin, function(req, res) {
    GoodsModel.getGoodsAll().then((msg)=>{
        res.json({ status: true, message: "成功!", data: msg})
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})
// 获取在售状态商品
router.get('/sale', checkLogin, function(req, res) {
    GoodsModel.getGoodsSale().then((msg)=>{
        res.json({ status: true, message: "成功!", data: msg})
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})
// 获取下架商品
router.get('/out', checkLogin, function(req, res) {
    GoodsModel.getGoodsOut().then((msg)=>{
        res.json({ status: true, message: "成功!", data: msg})
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})
// 名称查询
router.get('/name/:name', checkLogin, function(req, res){
    GoodsModel.getGoodsByName(req.params.name).then((msg)=>{
        res.json({ status: true, message: "成功", data:msg});
    }).catch((e)=>{
        res.json({ status: false, message: "错误!", data: e})
    })
})
// 根据id列表返回goods列表
router.get('/ten', checkLogin, async function(req, res) {
    var data = await StatisticalModel.getGoodsTopTen();
    var tenGoods = []
    for(let i = 0; i < 10; i++) {
        tenGoods[i] = await GoodsModel.getGoodsById(data[i]._id)
        tenGoods[i] = tenGoods[i][0]
    }
    
    res.send(tenGoods);
    
})
// 根据类型获取
router.get('/type', checkLogin, function(req, res){
    var type = req.query.type
    GoodsModel.getGoodsByType(type).then((msg)=>{
        res.json({ status: true, message: "成功", data:msg});
    }).catch((e)=>{
        console.log(e);
        res.json({ status: false, message: "错误!", data: e})
    })
})


// 删除商品

router.delete('/:id', checkLogin, function(req, res) {
    var id = req.params.id;
    console.log(id);
    
    GoodsModel.delete(id).then((msg)=>{
        res.json({ status: true, message: "删除成功", data:msg});
    }).catch((e)=>{
        res.json({ status: false, message: "错误!"})
    })
})
module.exports = router