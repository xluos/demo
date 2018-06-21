module.exports = function (app) {
    app.use('/login', require('./login'));
    app.use('/signup',require('./signup'));
    app.use('/user', require('./users'));
    app.use('/goods', require('./goods'));
    app.use('/order', require('./order'));
    app.use('/stats', require('./statistical'));

}