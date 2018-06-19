const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function (user) {
      return User.create(user).exec()
    },
    find: function () {
      return User
          .find({})
          .exec();
    },
    update: function (id, user) {
      return User.update({_id: id}, {$set:user}).exec()
    },
    getUsersByTypeVal: function (type, val) {
      var findVal = {};
      findVal[type] = {$regex:val }
      return User
        .find(findVal)
        .exec()
    },
    delete: function(id) {
      return User
              .deleteOne({ _id: id })
              .exec()
    }
}