var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var MATRIX_EDGES = 20;  //方格边长
var RADIUS = 9;        //方格中小球半径
var INTERSPACE = 20;   //数字之间的间距
var X = 100;           //绘制数字在X轴的起点
var Y = 100;           //绘制数字在Y轴的起点
const LOSS = 0.7;          //碰撞损失系数

/**
 * 重新计算画布大小等于页面大小
 * 
 */
function resetCanvas() {
    console.log("a");
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    MATRIX_EDGES = width * 0.013;
    INTERSPACE = MATRIX_EDGES;
    RADIUS = MATRIX_EDGES * 9 / 20;
    X = width * 0.1;
    Y = height * 0.3;

}
/**
 * 取一个区间内的随机数
 * 
 * @param {any} min 区间下限
 * @param {any} max 区间上限
 * @returns 随机数
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 向下取整
 * 
 * @param {any} n 浮点数
 * @returns 取整后的数
 */
function floor(n) {
    return Math.floor(n);
}
// function getRandomColor() {
//     return '#' +
//         (function (color) {
//             return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
//                 && (color.length == 6) ? color : arguments.callee(color);
//         })('');
// }
/**
 * 随机一个比较明亮的颜色
 *  
 * @returns HSL格式的字符串
 */
function getRandomColor() {
    let hue = floor(random(0, 240));           //色相
    let saturation = floor(random(60, 100));   //饱和度
    let lightness = floor(random(50, 70));     //亮度
    return `hsl(${hue},${saturation}%,${lightness}%)`
}
/**
 * 下落小球的构造函数
 * 
 * @param {any} x 小球x轴坐标
 * @param {any} y 小球y轴坐标
 */
function Ball(x, y) {
    this.x = x;
    this.y = y;
}
// 小球继承的方法
Ball.prototype = {
    /**
     * 初始化小球的信息
     * 
     */
    init: function () {
        this.r = RADIUS;         //半径
        this.color = getRandomColor();  //小球颜色
        this.vx = random(2, 4) * (Math.random() > 0.5 ? 1 : -1);     //X轴的速度
        this.vy = random(-4, -2);    //Y轴的速度
        this.v = Math.sqrt(this.vx * this.vx + this.vy * this.vy);  //合成后的速度
        this.g = random(0.3, 0.5);    //下落的加速度
        this.t = 0;    //下落时间
    },
    /**
     * 绘制小球
     * 
     */
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.updata();
    },
    /**
     * 更新小球数据
     * 
     */
    updata: function () {
        this.t++;      //更新一次度过一个时间单位
        this.x += this.vx;  //X轴坐标加上X轴的速度
        this.y += this.vy;  //Y轴坐标加上Y轴的速度
        this.vy += this.g;  //速度加上 加速度

        // 碰撞！ 如果下落碰地了且速度是向下的将速度反向并乘以损耗 
        if ((this.y > canvas.height - RADIUS) && this.vy > 0) {
            this.vy = -this.vy * LOSS;
        }
    }
}
/**
 * 粒子时钟构造函数
 * 
 */
function Numbertime() { }

// 继承的方法
Numbertime.prototype = {
    // 储存时间的各个数字  10代表分号
    time: [],
    // 储存彩色下落小球的数组
    balls: [],
    // 初始化
    init: function () {
        this.time = this.getTimeNum();
    },
    // 获取时间数组     面条代码Low爆了用正则还要加分号干脆直接暴力来
    getTimeNum: function () {
        let date = new Date();
        let time = [];
        // 时    
        let num = date.getHours();
        time.push(floor(num / 10));
        time.push(num % 10);
        time.push(10);    //分号
        // 分
        num = date.getMinutes();
        time.push(floor(num / 10));
        time.push(num % 10);
        time.push(10);
        // 秒
        num = date.getSeconds();
        time.push(Math.floor(num / 10));
        time.push(num % 10);
        return time;
    },
    // 绘制粒子时钟
    draw: function () {
        // 小球颜色
        ctx.fillStyle = "#011F3F";
        let Offset_X;
        for (let i = 0; i < this.time.length; i++) {
            // 初始偏移距离 + 每个空隙的距离（前面已经有了i个空隙所以乘i） + 每个数字的宽度（7是因为一个数字由7列小球组成，前面已经有了i个所以乘i）
            Offset_X = X + i * INTERSPACE + 7 * i * MATRIX_EDGES;
            // drawNum（X，Y，N） 在X，Y 的位置绘制一个数字 N  这个函数在下面实现
            this.drawNum(Offset_X, Y, this.time[i]);
            // ctx.strokeRect(10*i+X + 7 * i * MATRIX_EDGES, Y, 7*MATRIX_EDGES, 10*MATRIX_EDGES);
        }
        //遍历每个彩色小球
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw();//调用下落小球的绘制方法
            // 移动出边界了就删除掉
            if ((this.balls[i].x > canvas.width) || (this.balls[i].x < 0)) {
                this.balls.splice(i, 1);
                i--;
            }
        }
        // 更新数据
        this.updata();
    },
    // 在指定坐标绘制数字矩阵
    drawNum: function (x, y, num) {
        // 获取储存相应数字的矩阵
        let matrix = DIGIT[num];
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    // 矩阵为1的值画一个小球
                    ctx.beginPath();
                    // 下面中间比较长的是根据偏移量和当前的i行j列是计算小球的圆心坐标
                    ctx.arc(x + j * MATRIX_EDGES + MATRIX_EDGES / 2, y + i * MATRIX_EDGES + MATRIX_EDGES / 2, RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    },
    // 更新数据
    updata: function () {
        // 获取新的时间
        let newTime = this.getTimeNum();
        // this.time = this.getTimeNum();

        // 遍历每一位和老的时间比较,如果不同就生成新时间的彩色小球
        for (let i = 0; i < 8; i++) {
            if (newTime[i] !== this.time[i]) {
                this.createBalls(i, newTime[i])
                this.time[i] = newTime[i];
            }
        }
    },
    createBalls: function (n, num) {
        let matrix = DIGIT[num];
        // 计算当前数字所需要的偏移量
        let x = X + n * INTERSPACE + 7 * n * MATRIX_EDGES;
        let y = Y;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === 1) {
                    // 计算小球的圆心坐标
                    let o = new Ball(x + j * MATRIX_EDGES + MATRIX_EDGES / 2, y + i * MATRIX_EDGES + MATRIX_EDGES / 2);
                    o.init();
                    this.balls.push(o);
                }
            }
        }
    }
}

// 窗口发生变化是重新设置canvas的大小和相关参数
window.onresize = resetCanvas;
resetCanvas();
var nums = new Numbertime();
nums.init();

function aimn() {
    ctx.fillStyle = "#F5F5F5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    nums.draw();
    // console.clear();
    requestAnimationFrame(aimn);
}

aimn();