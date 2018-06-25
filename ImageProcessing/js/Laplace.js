var i,j,k;

function cget(w) {
    return function(i,j) {
       return i * w  + j;
    }
}

function Laplace(imgData, n) {
    // 拉普拉斯4邻域算子
    var laplace4 = [
        0,1,0,
        1,-4,1,
        0,1,0
    ];
    // 拉普拉斯8邻域算子    
    var laplace8 = [
        1,1,1,
        1,-8,1,
        1,1,1
    ]
    var laplace
    if(n === 4) {
        laplace = laplace4;
    } else if(n === 8) {
        laplace = laplace8
    }
    var offset = 1;
    // 偏移
    var dir = [
        [-1,-1],[-1,0],[-1,1],
        [0,-1],[0,0],[0,1],
        [1,-1],[1,0],[1,1],
    ];
    var W = imgData.width
       ,H = imgData.height
       ,N ;
    var getimgindex = cget(W);
    var getindex = cget(1);
    var data = {
        width: imgData.width,
        height: imgData.height,
        data: []
    }
    for(i = offset; i< H-offset; i++) {
        for(j = offset; j < W-offset; j++) {
            N = getimgindex(i,j)
            var sum = 0;
            for(k = dir.length - 1; k >= 0; k--) {
                sum +=    imgData.data[getimgindex(i+dir[k][0],j+dir[k][1])] 
                        * laplace[getindex(Math.floor(k/3),k%3)]
            }
            
            data.data[N] = Math.floor(Math.abs(sum));
        }
    }
    
    return data;
}



function ColorImageLaplace(n) {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(imgData);
    var W = imgData.width
       ,H = imgData.height
       ,N 
       ,RData = {
           width: imgData.width,
           height: imgData.height,
           data:[]
        }
       ,GData = {
        width: imgData.width,
        height: imgData.height,
        data:[]
        }
       ,BData = {
            width: imgData.width,
            height: imgData.height,
            data:[]
        }
       ;
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            RData.data[Math.floor(N/4)] = imgData.data[N];
            GData.data[Math.floor(N/4)] = imgData.data[N + 1];
            BData.data[Math.floor(N/4)] = imgData.data[N + 2];
        }
    }
    RData = Laplace(RData, n);
    GData = Laplace(GData, n);
    BData = Laplace(BData, n);
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            imgData.data[N] = RData.data[Math.floor(N/4)];
            imgData.data[N + 1] = GData.data[Math.floor(N/4)];
            imgData.data[N + 2] = BData.data[Math.floor(N/4)];
        }
    }
    ctx2.putImageData(imgData,0,0);
    updateBar(bar2Chart, imgData);
}