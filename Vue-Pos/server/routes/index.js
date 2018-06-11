module.exports = function (app) {
    app.use('/login', require('./login'))
    app.use('/signup',require('./signup.js'))
}