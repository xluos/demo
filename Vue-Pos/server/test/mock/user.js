var Mock = require('mockjs')
const User = require('../../lib/mongo').User

var data = Mock.mock({
    'list|20': [{
        'name': '@cname',
        'tel': /^1[385][1-9]\d{8}/,
        'wx': /^[a-z]{3}\d{8}/,
        'integral|5-45': 0,
        'sumintegral|50-500': 0,
        'grade|0-2': 0,
        'balance|5-100': 0,
        'lasttime': '@datetime'
    }]
})

User.insertMany(data.list).exec().then((msg)=>{
    console.log('插入完成');
})



