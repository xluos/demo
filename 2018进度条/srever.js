
const fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var options = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  index: 'index.html',
  maxAge: '1d',
  redirect: true,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}
app.use(express.static('./', options));
app.get('/submit', function (req, res) {
  var flag = 1;
  var email_address = req.query;
  console.log(email_address);
  var email_address_list = JSON.parse(fs.readFileSync('./NodeEmail/MailList.json'));
  for (let i = email_address_list.length - 1; i >= 0; i--) {
    if (email_address_list[i] === email_address.email) {
      res.send("不要重复输入！");
      flag = 0;
      break;
    }
  }
  if (flag === 1) {
    email_address_list.push(email_address.email);
    fs.writeFileSync('./NodeEmail/MailList.json', JSON.stringify(email_address_list));
    res.send("订阅成功！");
  }
});
app.listen(3000); 