var i,j;
var g2r = []  //映射归一化的灰度级
var nk = []  //储存各灰度级的频数
var pnk = [] //储存各灰度级频率
var sk = [] //储存累计概率分布


function HistogramEqualization(imgData) {
    // 初始化
    for(i = 0; i < 256; i++) {
        g2r[i] = i/255;
        nk[i] = 0; //初始化
    }

    // console.log(imgData.data);
    // 计算个灰度级频率
    var W = imgData.width
       ,H = imgData.height
       ,N ;
    // 统计个灰度频数
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * W  + j;
            nk[imgData.data[N]]++
        }
    }
    // 计算频率
    N = imgData.width * imgData.height;

    //计算各灰度级频率
    for(i = 0; i < 256; i++) {
        pnk[i] = nk[i]/N; 
    }

    // 计算累计概率分布
    sk[0] = pnk[0];
    for(i = 1; i < 256; i++) {
        sk[i] = pnk[i] + sk[i-1]; 
    }
    // console.log(sk);
    // 逆归一化灰度级 
    for(i = 0; i < 256; i++) {
        sk[i] = Math.floor(sk[i] * 255); 
    }
    // console.log(sk);
    
    // 重新映射原图像灰度级
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * W  + j;
            imgData.data[N] = sk[imgData.data[N]]
        }
    }
    // console.log(imgData.data);
    
    return imgData;
}


function GrayImageHistogramEqualization() {
    var imgData = grayfun();
    // console.log(imgData);
    var W = imgData.width
       ,H = imgData.height
       ,N 
       ,DealWithData = {
           width: imgData.width,
           height: imgData.height,
           data:[]
       };
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            DealWithData.data[Math.floor(N/4)] = imgData.data[N]
        }
    }
    DealWithData = HistogramEqualization(DealWithData);
    for(let i = 0; i< H; i++) {
        for(let j = 0; j < W; j++) {
            N = i * 4 * W  + j * 4;
            imgData.data[N] = DealWithData.data[Math.floor(N/4)];
            imgData.data[N + 1] = DealWithData.data[Math.floor(N/4)];
            imgData.data[N + 2] = DealWithData.data[Math.floor(N/4)];
        }
    }
    ctx2.putImageData(imgData,0,0);
    updateBar(bar2Chart, imgData);
}


function ColorImageHistogramEqualization() {
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
    RData = HistogramEqualization(RData);
    GData = HistogramEqualization(GData);
    BData = HistogramEqualization(BData);
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