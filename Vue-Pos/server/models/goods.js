const Goods = require('../lib/mongo').Goods

module.exports = {
    // 注册一个用户
    create: function (goods) {
      return Admin.create(goods).exec()
    },
    getUserByName: function (name) {
        return Admin
          .findOne({ name: name })
          .addCreatedAt()
          .exec()
    }
}