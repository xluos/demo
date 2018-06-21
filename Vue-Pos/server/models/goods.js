const Goods = require('../lib/mongo').Goods

module.exports = {
    // 创建商品
    create: function (goods) {
        return Goods.create(goods).exec()
    },
    getGoodsAll: function () {
        return Goods
            .find({})
            .exec()
    },
    getGoodsSale: function () {
        return Goods
            .find({ sell: true })
            .exec()
    },
    getGoodsOut: function () {
        return Goods
            .find({ sell: false })
            .exec()
    },
    getGoodsByName: function (name) {
        return Goods
            .find({ name: { $regex: name } })
            .addCreatedAt()
            .exec()
    },
    getGoodsByType: function (val) {
        return Goods
            .find({ type: val, sell: true})
            .map({ _id: 1,name:1,type:1,imgurl:1,price:1 })
            .exec()
    },
    getGoodsById: function (val) {
        return Goods
            .find({ _id: val})
            .map({ _id: 1,name:1,type:1,imgurl:1,price:1 })
            .exec()
    },
    update: function (form) {
        return Goods
            .update({ _id: form._id }, { $set: form })
            .exec()
    },
    delete: function (id) {
        return Goods
            .deleteOne({ _id: id })
            .exec()
    }
}