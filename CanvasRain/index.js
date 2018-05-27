var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var H = window.innerHeight;
var W = window.innerWidth;
const SIZE = 2;
const COUNT = 30;



/**
 * 清空画布
 *  
 * @param {any} ctx 渲染上下文 
 * @param {any} color 颜色
 */
function clearCanvas(ctx,color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
}
/**
 * 重新计算画布大小等于页面大小
 * 
 */
function resetCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    console.log(H,W);
    
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



function Rain() {};

Rain.prototype = {
    init: function () {
        // 雨滴属性
        this.x = random(0, W);
        this.y = random(0, 0.1*H);
        this.vy = random(4, 6);
        this.color = "hsl(180, 100%, 50%)";
        this.a_max = random(.8*H, .9*H);

        // 涟漪属性
        this.a = 1;
        this.b = 3;
        this.va = 1.2;
        this.vb = 3;
        this.opacity = 1;
        this.vo = 0.01;

    },
    draw: function() {
        if(this.y > this.a_max) {
            // 绘制涟漪
            let color = `hsla(180, 100%, 50%, ${this.opacity})`;
            // console.log(this.opacity);
            
            ctx.beginPath();
			ctx.moveTo(this.x, this.y - this.a / 2);

			ctx.bezierCurveTo(
				this.x + this.b / 2, this.y - this.a / 2,
				this.x + this.b / 2, this.y + this.a / 2,
				this.x, this.y + this.a / 2);

			ctx.bezierCurveTo(
				this.x - this.b / 2, this.y + this.a / 2,
				this.x - this.b / 2, this.y - this.a / 2,
				this.x, this.y - this.a / 2);

			ctx.strokeStyle = color;
			ctx.stroke();
			ctx.closePath();
        } else {
            // 绘制雨滴
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, SIZE, SIZE*3);
        }
        this.update()
    },
    update: function () {
        if(this.y > this.a_max) {
            // 更新涟漪
            if(this.opacity > 0) {
                this.a += this.va;
                this.b += this.vb;
                this.va -= 0.01;
                this.vb -= 0.01;
                this.opacity -= this.vo;
            }else {
                this.init();
            }
        } else {
            // 更新雨滴
            this.y += this.vy;
        }
    }
}

// 创建雨滴
var rains = [];
for(let i = 0; i < COUNT; i++) {
    // 让雨滴不同时出现
    setTimeout(()=>{
        let rain = new Rain();
        rain.init();
        rains.push(rain);
    },i*300);
    
}


function ainm() {
    clearCanvas(ctx,"rgba(0,0,0,.1)");
    
    rains.forEach(ele=>ele.draw());
    requestAnimationFrame(ainm);
}
// 窗口发生变化是重新设置canvas的大小和相关参数
window.onresize = resetCanvas;
resetCanvas();

ainm();