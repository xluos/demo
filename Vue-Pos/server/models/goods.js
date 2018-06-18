const Goods = require('../lib/mongo').Goods

module.exports = {
    // 创建商品
    create: function (goods) {
      return Goods.create(goods).exec()
    },
    getGoodsAll: function() {
      return Goods
              .find({})
              .exec()
    },
    getGoodsSale: function() {
      return Goods
              .find({ sell: true})
              .exec()
    },
    getGoodsOut: function() {
      return Goods
              .find({ sell: false})
              .exec()
    },
    getGoodsByName: function (name) {
        return Goods
          .findOne({ name: name })
          .addCreatedAt()
          .exec()
    }
}