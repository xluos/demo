const express = require('express')
const router = express.Router()
const moment = require('moment')
const checkLogin = require('../middlewares/check.js').checkLogin
const OrderModel = require('../models/order')

router.post('/', checkLogin, function(req, res) {
    var order = req.fields;
    order.time = moment(new Date()).format('YYYY-MM-DD HH:mm')
    OrderModel.create(order).then((msg)=>{
        res.json({status: true, message: "成功", data: msg});
    }).catch((e)=>{
        res.json({status: false, message: "失败", data: e});
    })
})

module.exports = router