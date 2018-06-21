const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const StatisticalModel = require('../models/statistical')
const moment = require('moment')
// 销量前十
router.get("/ten", checkLogin, function(req, res) {
    StatisticalModel.getGoodsTopTen().then((msg)=>{
        // console.log(msg);
        res.json({status: false, message: "成功", data: msg})
    }).catch((e)=>{
        // console.log(e);
        res.json({status: false, message: "失败", data: e})
    })
})
router.get("/timelist", checkLogin, async function(req, res) {
    var OrderList = await StatisticalModel.getOrderList();
    var timeList = {},times,orde;
    for(var i = OrderList.length -1;i>=0;i--) {
        orde = OrderList[i];
        times = moment(orde.time).format('YYYY-MM-DD');
        if(!timeList[times]) {
            timeList[times] = {
                zhushi:0,
                xiaoshi:0,
                yinpin:0,
                taocan:0
            }
        } else {
            timeList[times][orde.type]++;
        }
    }
    
    res.json({status: true, message:"成功", data:timeList});
})
module.exports = router