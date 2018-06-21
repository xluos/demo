const Mock = require('mockjs')
const Order = require('../../lib/mongo').Order
const Goods = require('../../lib/mongo').Goods
const GoodsModel = require('../../models/goods')
const OrderModel = require('../../models/order')
const moment = require('moment')

async function getgoods() {
    var goodslist = await Goods
                            .find({})
                            .map({ _id: 1,name:1,type:1,price:1 })
                            .exec()
    return goodslist;
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}

function addtime(datetime) {
    return moment(datetime)
            .add(randomInt(3,10),'m')
            .format('YYYY-MM-DD HH:mm')
}
console.log(addtime());