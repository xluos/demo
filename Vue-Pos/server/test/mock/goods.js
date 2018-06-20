var Mock = require('mockjs')
const Goods = require('../../lib/mongo').Goods

var data = Mock.mock({
    'list': [{
        'name': '@cname',
        'type': Mock.Random.pick(["zhushi", "xiaoshi", "yinpin", "taocan"]),
        'imgurl': "/img/upload_0f0414ed7883dfb1cd34de9f4fdf07a0.jpg",
        'cost|5-45': 0,
        'price|50-500': 0,
        'sell': Mock.Random.boolean(1,1),
        'number|20-100': 0
    }]
})
data.list = [];
for(var i=0;i<30;i++) {
    data.list.push(Mock.mock({
        'list': [{
            'name': '@cname',
            'type': Mock.Random.pick(["zhushi", "xiaoshi", "yinpin", "taocan"]),
            'imgurl': "/img/upload_0f0414ed7883dfb1cd34de9f4fdf07a0.jpg",
            'cost|5-45': 0,
            'price|50-500': 0,
            'sell': Mock.Random.boolean(1,5,false),
            'number|20-100': 0
        }]
    }).list[0])
}

Goods.insertMany(data.list).exec().then((msg)=>{
    console.log('插入完成');
})

console.log(data);
