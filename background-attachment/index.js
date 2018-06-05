var AD = document.getElementById("adItem");
var W_HEIGHT = window.innerHeight;

// 图片比例是2：3
var IMG_HEIGHT = window.innerWidth * 1.5;

window.addEventListener("resize", function() {
    W_HEIGHT = window.innerHeight;
    IMG_HEIGHT = window.innerWidth * 1.5;
    console.log(W_HEIGHT, "img",IMG_HEIGHT);
})

window.addEventListener("scroll", function () {
    var AD_HEIGHT = AD.getBoundingClientRect().y;
    // 偏移量为广告框出现的1/10
    var bg_offset = (W_HEIGHT - AD_HEIGHT) / 10;
    // ⬇广告框未出现时不判断      ⬇广告框未达到图片上边时进行偏移产生视差效果
    if(AD_HEIGHT < W_HEIGHT && AD_HEIGHT > (W_HEIGHT - IMG_HEIGHT + bg_offset)) {
        // 背景图片y轴的上边距为，页面高度-图片高度-偏移量
        AD.style = `background-position-y: ${W_HEIGHT - IMG_HEIGHT + bg_offset}px`;
    }      //广告框移出可视范围不判断   ⬇广告框达到图片上边时进行背景跟随效果
    else if(AD_HEIGHT > -150 && AD_HEIGHT <= (W_HEIGHT - IMG_HEIGHT + bg_offset)){
        AD.style = `background-position-y: ${AD_HEIGHT}px`;
    }
    
    
}, false)