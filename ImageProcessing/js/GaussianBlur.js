var i, j, k;

function cget(w) {
    return function (i, j) {
        return i * w + j;
    }
}

function GaussianBlur(imgData) {
    // 高斯模版
    var Ganssian = [
        1, 2, 1,
        2, 4, 2,
        1, 2, 1
    ];
    var offset = 1;
    // 偏移
    var dir = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 0], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];
    var W = imgData.width
        , H = imgData.height
        , N;
    var data = {
        width: imgData.width,
        height: imgData.height,
        data: []
    }
    var getimgindex = cget(W);
    var getindex = cget(1);

    for (i = offset; i < H - offset; i++) {
        for (j = offset; j < W - offset; j++) {
            N = getimgindex(i, j)
            var sum = 0;
            for (k = dir.length - 1; k >= 0; k--) {
                sum += imgData.data[getimgindex(i + dir[k][0], j + dir[k][1])]
                    * Ganssian[getindex(Math.floor(k / 3), k % 3)]
            }

            data.data[N] = Math.floor(sum / 16);
        }
    }

    return data;
}



function ColorImageGaussianBlur() {
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // console.log(imgData);
    var W = imgData.width
        , H = imgData.height
        , N
        , RData = {
            width: imgData.width,
            height: imgData.height,
            data: []
        }
        , GData = {
            width: imgData.width,
            height: imgData.height,
            data: []
        }
        , BData = {
            width: imgData.width,
            height: imgData.height,
            data: []
        }
        ;
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            N = i * 4 * W + j * 4;
            RData.data[Math.floor(N / 4)] = imgData.data[N];
            GData.data[Math.floor(N / 4)] = imgData.data[N + 1];
            BData.data[Math.floor(N / 4)] = imgData.data[N + 2];
        }
    }
    RData = GaussianBlur(RData);
    GData = GaussianBlur(GData);
    BData = GaussianBlur(BData);
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            N = i * 4 * W + j * 4;
            imgData.data[N] = RData.data[Math.floor(N / 4)];
            imgData.data[N + 1] = GData.data[Math.floor(N / 4)];
            imgData.data[N + 2] = BData.data[Math.floor(N / 4)];
        }
    }
    ctx2.putImageData(imgData, 0, 0);
    updateBar(bar2Chart, imgData);
}