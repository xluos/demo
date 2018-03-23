

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: 'index.html',
    maxAge: '1d',
    redirect: true,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    }
  }
  
  app.use(express.static('./', options));
// console.log('asdasd');
// app.get('/index.html', function (req, res) {
//     res.sendFile( __dirname + "/" + "index.html" );
//  })
//  app.get('/i.html', function (req, res) {
//     res.sendFile( __dirname + "/" + "i.html" );
//  })
//  app.get('/modal.css', function (req, res) {
//     res.sendFile( __dirname + "/" + "modal.css" );
//  })
app.all('/submit', function(req, res) {
//res.send(req.body.title + req.body.text);
    var url = req.query;
    console.log(url);
    res.send(url);
});
app.listen(3000); 