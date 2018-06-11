const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function (user) {
      return User.create(user).exec()
    },
    getUserByName: function (name) {
        return User
          .findOne({ name: name })
          .addCreatedAt()
          .exec()
      }
}