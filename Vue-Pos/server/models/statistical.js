const Order = require('../lib/mongo').Order

module.exports = {
  getGoodsTopTen: function (name) {
    return Order
      .aggregate([
        { $project: { _id: 0, goodslist: 1 } },
        { $unwind: "$goodslist" },
        {
          $project: {
            _id: 0,
            id: "$goodslist._id",
            type: "$goodslist.type",
            name: "$goodslist.name",
            number: "$goodslist.count",
          }
        },
        {
          $group: {
            _id: "$id",
            count: { $sum: "$number" },
            name: { $first: "$name" },
            type: { $first: "$type" }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },

      ])
      .exec()
  },
  getOrderList: function () {
    return Order.aggregate([
      { $project: { _id: 0, time: 1, goodslist: 1 } },
      { $unwind: "$goodslist" },
      {
        $project: {
          _id: 0,
          time: 1,
          type: "$goodslist.type",
        }
      }
    ]).exec()
  }
}