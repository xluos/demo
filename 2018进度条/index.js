var now = new Date();
var Year = now.getFullYear();
var start = new Date(Year, 0);
var end = new Date(Year + 1, 0);
document.title = Year + "进度条";
window.onload = function () {
    // var text = document.createTextNode(Year + "进度条");
    // document.getElementsByTagName("h1")[0].appendChild(text);
    var bar = document.getElementById("bar");
    var barWidth = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime()) * 100;
    bar.innerHTML = barWidth.toFixed(1) + "%";
    document.getElementById("bg").style.display = "none";
    $.ajax({
        type: "POST",
        url: 'https://api.hibai.cn/api/index/index',
        dataType: 'json',
        data: {"TransCode":"030111","OpenId":"123456789","Body":""},
        success: function(result){
            $("#one").text(result.Body.word + '   ————' + result.Body.word_from);
            $("#one").css("color","#fff");
        }
    });
    bar.style.width = barWidth + "%";
}
