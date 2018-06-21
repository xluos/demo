const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()


const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

// 
mongolass.plugin('map', {
  afterFind: function (results, map) {
    var mapkey = Object.keys(map)
    var newresults = [];
    results.forEach((item)=>{
      var newresult = {};
      mapkey.forEach((key)=>{
        newresult[key] = item[key]
      })
      newresults.push(newresult);
    })
    
    return newresults
  },
  afterFindOne: function (result, map) {
    var mapkey = Object.keys(map)
    var newresults = {};
    if (result) {
      mapkey.forEach((key)=>{
        newresults[key] = item[key]
      })
    }
    return newresults
  }
})

mongolass.connect(config.mongodb)

exports.Admin = mongolass.model('Admin', {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true },
})
exports.Admin.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

exports.User = mongolass.model('User', {
  name: {type: 'string' , require: true}, //用户名
  tel: {type: 'string' , require: true},  //电话号
  wx: {type: 'string' , require: false ,default: '暂未录入'},  //微信号
  integral: {type: 'number' , require: false , default: 0}, //现有积分
  sumintegral: {type: 'number' , require: false , default: 0},  //总积分
  grade: {type: 'number', require: false , range: [0, 2], default: 0}, //会员等级默认为1
  balance: {type: 'number', require: false, default: 0},  //账户余额
  lasttime: {type: Mongolass.Types.Date}  //最后交易时间
})
exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

exports.Goods = mongolass.model('Goods', {
  name: {type: 'string', require: true}, //商品名
  type: {type: 'string', require: true, enum:['zhushi', 'xiaoshi','yinpin', 'taocan'], default: 'zhushi'},
  imgurl: {type: 'string', require: false, default: ''},  //图片地址
  cost: {type: 'number', require: true, default: 0}, //成本
  price: {type: 'number', require: true, default: 0}, //售价
  sell: {type: 'boolean', require: false, default: true}, // 状态
  number: {type: 'number', require: false, default: 0} // 数量
})

exports.Order = mongolass.model('Order', {
  time: {type: Mongolass.Types.Date, require: true},
  paytype: {type: 'string', require: false, enum:['cash', 'balance','online'], default: 'cash'},
  goodslist:[{
              _id: {type: Mongolass.Types.ObjectId, require: true },
              type: {type: 'string', require: true },
              name: {type: 'string', require: true },
              count: {type: 'number', require: true }  
          }],
  userid: {type: 'string', require: false, default: '路人甲'},
})