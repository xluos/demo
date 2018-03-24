var ejs = require('ejs');
var fs = require('fs');
var  users = ['geddy', 'neil', 'alex'];

var txt = fs.readFileSync('./test.ejs','utf-8');
//console.log(txt);
console.log(typeof txt);
console.log(ejs.render(txt, {text:"abcd",type: "ie=edge"}));