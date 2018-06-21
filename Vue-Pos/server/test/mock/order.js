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
// console.log(addtime());

function randomGoodslist(goodslist) {
    var len = goodslist.length;
    var number = randomInt(3,10);
    var list = []
    var goods = {}
    for (let i = 0; i < number; i++) {
        goods = goodslist[randomInt(0,len)];
        list.push({
            _id: goods._id,
            type: goods.type,
            name: goods.name,
            count: randomInt(1,5)
        })
    }
    return list
}

async function create() {
    var goodslist = await getgoods();
    var count = 0;
    var orderlist = [];
    var order = {};
    var datetime = "2018-05-20T09:29:51.750"
    
    while (moment().isAfter(datetime)) {
        order = {
            time: datetime,
            goodslist: randomGoodslist(goodslist)
        }
        orderlist.push(order);
        datetime = addtime(datetime);
        count++;
        console.log(count,datetime);
        
    }
    console.log('ok');
    
    return orderlist;
}


// create()
(async function() {
    var Orderslist = await create();

    console.log('insert');
    
    
    Order.insertMany(Orderslist).exec().then((msg)=>{
        console.log('插入完成');
    })
})()

