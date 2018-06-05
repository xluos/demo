var AD = document.getElementById("adItem");
var W_HEIGHT = window.innerHeight;
var IMG_HEIGHT = 620;

window.addEventListener("scroll", function () {
    var AD_HEIGHT = AD.getBoundingClientRect().y;
    var bg_offset = (W_HEIGHT - AD_HEIGHT) / 10;
    
    if(AD_HEIGHT > (W_HEIGHT - IMG_HEIGHT + bg_offset)) {
        AD.style = `background-position-y: ${W_HEIGHT - IMG_HEIGHT + bg_offset}px`;
    } else if(AD_HEIGHT > -150 && AD_HEIGHT <= (W_HEIGHT - IMG_HEIGHT + bg_offset)){
        AD.style = `background-position-y: ${AD_HEIGHT}px`;
    }
    
    
}, false)