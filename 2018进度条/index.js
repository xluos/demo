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
    bar.style.width = barWidth + "%";
}
