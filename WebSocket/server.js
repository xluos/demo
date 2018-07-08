const ws  = require("nodejs-websocket");

var server = ws.createServer(function(conn) {
    console.log("New connection");
    conn.on("text", function(str) {
        console.log("收到" + str);
        conn.sendText(str + "!!");
    })
    conn.on("close", function(code, reason) {
        console.log('关闭连接');
    })
}).listen(3000);