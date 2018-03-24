var ejs = require('ejs');
var fs = require('fs');

function modify(path,data){
    var txt = fs.readFileSync(path,'utf-8');
    return ejs.render(txt, data);
}
