# Canvas动画-霓虹雨 [演示地址](https://xluos.github.io/demo/CanvasRain/)

在网上看到的一个Canvas动画，感觉比较炫酷就照着写了一个，原地址[codepan](https://codepen.io/anon/pen/KROodp?editors=0110)

## 实现
其实简单的Canvas动画都是一个套路。每个元素都是一个对象，然后根据自身的属性中的位置，颜色大小之类的绘制（draw），然后更新数据。每一帧，清空一次再遍历绘制一遍。如果需要残影效果，就用透明背景覆盖。

现在来分析一下，这个动画中的元素很显然只有一个，就是 **雨滴**。但是他有两种状态，**下降态**和 **涟漪态**。所以我们分析一下这两种状态分别需要哪些属性
+ 下落时
    + 位置(x,y)
    + 下落速度vy
    + 下落终点(最大下落高度)
    + 自身颜色
+ 涟漪态
    + 涟漪椭圆的长宽(a,b)
    + 两个轴增长速度(va,vb)
    + 不透明度(opacity)
    + 不透明度减小速度(ov)

这些就是`init()`时需要初始化的东西，有些随机一下效果会更好

**绘制时：**
判断是否到最大高度，来选择绘制点还是椭圆。这里因为Canvas没有给椭圆的接口，所以使用贝塞尔曲线来模拟绘制椭圆，**绘制完毕后更新数据**
```js
if(this.y > this.a_max) {
            // 绘制涟漪
            let color = `hsla(180, 100%, 50%, ${this.opacity})`;
            // 贝塞尔曲线绘制椭圆
            ctx.beginPath();
			ctx.moveTo(this.x, this.y - this.a / 2);
            // 绘制右边椭圆弧
			ctx.bezierCurveTo(
				this.x + this.b / 2, this.y - this.a / 2,
				this.x + this.b / 2, this.y + this.a / 2,
				this.x, this.y + this.a / 2);
            // 绘制左边椭圆弧
			ctx.bezierCurveTo(
				this.x - this.b / 2, this.y + this.a / 2,
				this.x - this.b / 2, this.y - this.a / 2,
				this.x, this.y - this.a / 2);
            // 设置颜色绘制
			ctx.strokeStyle = color;
			ctx.stroke();
			ctx.closePath();
        } else {
            // 绘制雨滴
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, SIZE, SIZE*3);
        }
        // 更新数据
        this.update()
```

**数据更新：**
数据更新也是一样，根据判断不同的状态来进行不同的操作
```js
if(this.y > this.a_max) {
    if(this.y > this.a_max) {
        // 更新涟漪
        if(this.opacity > 0) {
            this.a += this.va;
            this.b += this.vb;
            this.va -= 0.01;
            this.vb -= 0.01;
            this.opacity -= this.vo;
        }else {
            // 透明度降到0后重新初始化这个元素，重用它
            this.init();
        }
    } else {
        // 更新雨滴
        this.y += this.vy;
    }
```