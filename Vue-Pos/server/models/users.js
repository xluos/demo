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
    update: function (id, user) {
      return User.update({_id: id}, {$set:user}).exec()
    },
    getUserById: function (id) {
      return User
        .findOne({ _id: id })
        .addCreatedAt()
        .exec()
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
    },
    getUserByWx: function (wx) {
      return User
        .findOne({ wx: wx })
        .addCreatedAt()
        .exec()
    }
}