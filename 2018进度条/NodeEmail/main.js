const ejsm = require('./ejs_modify.js');
const send_email = require('./email.js');
const fs = require('fs');
// 获取时间
var now = new Date();
var Year = now.getFullYear();
var start = new Date(Year, 0);
var end = new Date(Year + 1, 0);
// 当前时间百分比
var barWidth = ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime()) * 100).toFixed(1) + "%";

// 创建数据对象

var data = {
    width: barWidth
}

// 渲染邮件模版

var email_HTML = ejsm.modify('./email_bar/email_template.html',data);

//获取收件人列表
var tolist = JSON.parse(fs.readFileSync('./MailList.json','utf-8')).join(',');

// 发送邮件
send_email.send(Year + "已经过了" + barWidth,email_HTML,tolist);
