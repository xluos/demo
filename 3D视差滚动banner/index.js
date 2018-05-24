var bg = document.getElementsByClassName("bg")[0];
const banner = document.getElementsByClassName("banner")[0];
const bannerImg = document.getElementsByClassName("banner-img");
const title = document.getElementsByClassName("title");
// 页面宽高
var vWidth = window.innerWidth;
var vHeight = window.innerHeight;

// 滚动步长角度
var step = 90;
// 滚动目标，结束时的角度
var end = 0;
// 计时器id
var start = null;
// 当前页和下一页
var pageId = 0;
var nextPageId = 1;

// 滚动时间 秒为单位
var time = .8;
// 每一帧的步长
var oneStep = 1;

// Transformjs 对象初始化
Transform(banner,true);
for(let i=0; i < bannerImg.length; i++) {
    Transform(bannerImg[i], true);
    Transform(title[i], true);
    bannerImg[i].rotateX = 90 * i;
}
// 重新设置相关配置
function setTranslate() {
    vWidth = window.innerWidth;
    vHeight = window.innerHeight;
    bannerImg[0].translateZ = vHeight / 2;
    bannerImg[1].translateY = vHeight / 2;
    bannerImg[2].translateZ = -vHeight / 2;
    bannerImg[3].translateY = -vHeight / 2;
    banner.translateZ = -vHeight / 2;
    bg.style.perspective = vHeight * 4 + "px";
}
setTranslate();
// 页面大小改变重新设置
window.onresize = setTranslate;

// 滚动动画函数
function rotateNext() {
    
    banner.rotateX += oneStep;
    // 文字偏移制造视差效果
    title[nextPageId].translateY += oneStep * 3;
    title[pageId].translateY += oneStep * 3;

    if((step < 0 && banner.rotateX > end) 
        || (step > 0 && banner.rotateX < end)) {
        start = requestAnimationFrame(rotateNext)
    } else {
        end %=360;
        banner.rotateX %=360;
        start = null;
        title[pageId].translateY = 0;
        pageId = nextPageId;
    }
    
}



// 滚轮事件
banner.addEventListener("mousewheel", function(event){
    if(start === null) {
        if(event.wheelDelta > 0) {
            // 向下滚动
            step = 90;
            nextPageId = (pageId - 1 + 4) % 4;
            title[nextPageId].translateY -= 270;
        } else {
            // 向上滚动
            step = -90;
            nextPageId = (pageId + 1) % 4;
            title[nextPageId].translateY += 270;
        }
        oneStep = step / (time * 60);
        end += step;
        start = requestAnimationFrame(rotateNext);
    }
}, false)