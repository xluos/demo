module.exports = {
  port: 3000,
  session: {
    secret: 'pos',
    key: 'pos',
    maxAge: 1000 * 60 * 60 * 2
  },
  mongodb: 'mongodb://pos:123456@localhost:27017/pos'
}