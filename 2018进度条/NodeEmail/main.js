const ejsm = require('./ejs_modify');
const send_email = require('./email.js');
const fs = require('fs');
const request = require('request');
// 获取时间
var now = new Date();
var Year = now.getFullYear();
var start = new Date(Year, 0);
var end = new Date(Year + 1, 0);
// 当前时间百分比
var barWidth = ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime()) * 100).toFixed(1) + "%";
var data = {
    width: barWidth,
    one: ""
}
console.log('时间完毕');
// 创建数据对象


request({
    url: "https://api.hibai.cn/api/index/index",
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: {"TransCode":"030111","OpenId":"123456789","Body":""}
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        data.one = body.Body.word + '    —————— ' + body.Body.word_from
    }
    // 渲染邮件模版
    console.log(data.one);
    var email_HTML = ejsm.modify('./email_bar/email_template.html',data);
    console.log('渲染完毕');
    //获取收件人列表
    var tolist = JSON.parse(fs.readFileSync('./MailList.json','utf-8')).join(',');
    console.log('列表就绪');
    // 发送邮件
     send_email.send(Year + "已经过了" + barWidth,email_HTML,tolist);
});

