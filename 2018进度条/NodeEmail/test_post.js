var request = require('request')

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
        get(data);
    }
});


