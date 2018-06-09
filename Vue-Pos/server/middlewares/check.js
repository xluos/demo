module.exports = {
    checkLogin: function checkLogin (req, res, next) {
        if (!req.session.user) {
            return res.json({status: false, message: "尚未登录"})
        }
        next()
    },

    checkNotLogin: function checkNotLogin (req, res, next) {
        if (req.session.user) {
            return res.json({status: false, message: "不要重复登录"})
        }
        next()
    }
}