// 选择需要用到的元素

const Update = document.getElementById('imgupdate')

// const imgbox = document.getElementById('imgbox')
const gray = document.getElementById('gray')
// const draw = document.getElementById('draw')
const reverse = document.getElementById('reverse')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext("2d");
var reader = new FileReader();
const $ = function (query) {
    return document.querySelector(query)
}
// 上传文件事件
Update.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var type = file.type.split('/')[0];
    window.imgType = file.type
    if (type != 'image') {
        alert('请上传图片');
        return;
    }
    var size = Math.floor(file.size / 1024 / 1024);
    var maxSize = 10
    if (size > maxSize) {
        alert(`图片大小不得超过${maxSize}M`);
        return;
    };
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
        console.log("加载完成");
        var img = new Image();
        img.onload = function() {
            // console.log(img.width,img.height);
            canvas.width = img.width;   
            canvas.height = img.height;
            canvas2.width = img.width;   
            canvas2.height = img.height;
            ctx.drawImage(img,0,0);
            updateBar(barChart, ctx.getImageData(0, 0, canvas.width, canvas.height))
        }
        img.src = reader.result;
        this.readAsArrayBuffer(file)
        this.onloadend = function () {
            console.log(this.result);
            window.buffer = this.result
        }
    }
})

// 利用canvas压缩
function compressCanvas (quality = 0.9) {
    quality = parseInt($('#compressValue').value)/100 || quality
    canvas.toBlob(function (blob) {
        console.log(blob);
        window.blob = blob
        let href = window.URL.createObjectURL(blob)
        console.log(href);
        
        $('#compressImg').src = href
        let down = document.createElement('a')
        down.download = 'compressImg'
        down.href = href
        down.click()
    }, window.imgType, quality)
}

// 转换成灰度图像
gray.addEventListener('click', grayfun)

function grayfun() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(imgData);
    var W = imgData.width
       ,H = imgData.height
       ,N 
       ,avg;
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            // 求平局值
            avg = (imgData.data[N] + imgData.data[N+1] + imgData.data[N + 2])/3;
            imgData.data[N] = imgData.data[N+1] = imgData.data[N + 2] = avg;
        }
    }
    ctx2.putImageData(imgData,0,0);
    updateBar(bar2Chart, imgData);
    return imgData;
}
// 反相操作
reverse.addEventListener('click', function() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(imgData);
    var W = imgData.width
       ,H = imgData.height
       ,N 
       ,avg;
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            imgData.data[N] = 255 - imgData.data[N];
            imgData.data[N + 1] = 255 - imgData.data[N + 1];
            imgData.data[N + 2] = 255 - imgData.data[N + 2];
            imgData.data[N + 3] = 150;
        }
    }
    ctx2.putImageData(imgData,0,0);
    updateBar(bar2Chart, imgData);
})

// 颜色增强，参数0,1,2分别代表r,g,b
function addcolor(n) {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(imgData);
    var W = imgData.width
       ,H = imgData.height
       ,N 
       ,avg;
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            imgData.data[N + n] = imgData.data[N + n] + 50;
        }
    }
    ctx2.putImageData(imgData,0,0);
    updateBar(bar2Chart, imgData);
}