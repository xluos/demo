const Admin = require('../lib/mongo').Admin

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
    },
    update: function (user, newpwd) {
        return Admin.update({name: user},{ $set:{ password: newpwd}}).exec();
    }
}