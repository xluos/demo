const Order = require('../lib/mongo').Order

module.exports = {
    // 注册一个用户
    create: function (user) {
      return Admin.create(user).exec()
    },
    getUserByName: function (name) {
        return Admin
          .findOne({ name: name })
          .addCreatedAt()
          .exec()
      }
}