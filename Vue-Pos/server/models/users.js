const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function (user) {
      return User.create(user).exec()
    },
    find: function () {
      return User
          .find({})
          .addCreatedAt()
          .exec();
    },
    update: function (user) {

    },
    getUserByName: function (name) {
        return User
          .findOne({ name: name })
          .addCreatedAt()
          .exec()
    },
    getUserByTel: function (tel) {
        return User
          .findOne({ tel: tel })
          .addCreatedAt()
          .exec()
    }
}