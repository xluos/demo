module.exports = function (app) {
    app.use('/login', require('./login'));
    app.use('/signup',require('./signup'));
    app.use('/user', require('./users'));
}