const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const GoodsModel = require('../models/goods')

// 创建
router.post('/', checkLogin, function(req, res) {
    var goods = req.fields
    //goods.imgurl = req.files.avatar.path
    console.log('aaa');
    
    console.log(req.fields);
    res.send("updata");
    
})

module.exports = router