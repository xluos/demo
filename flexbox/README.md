# Flexbox演示站 [地址](https://xluos.github.io/demo/flexbox/)

可以通过动态的点击flexbox属性可以实时看到各个属性的效果，有助于理解各个属性。

友好的提示，鼠标放在选项上面悬停显示各个属性效果。


# Flexbox布局各种属性速查表

# 容器属性

## `flex-direction`主轴方向
+ `row`（默认值）：主轴为水平方向，起点在左端。
+ `row-reverse`：主轴为水平方向，起点在右端。
+ `column`：主轴为垂直方向，起点在上沿。
+ `column-reverse`：主轴为垂直方向，起点在下沿。
## `flex-wrap`轴线是否换行
+ `nowrap`（默认）：不换行
+ `wrap` : 换行，第一行在上方
+ `wrap-reverse` : 换行，第一行在下方
## `flex-flow`前两个属性的简写形式，默认值为`row` `nowrap`
## `justify-content`: 定义了项目在主轴上的对齐方式
+ `flex-start`（默认值）：左对齐
+ `flex-end`：右对齐
+ `center`： 居中
+ `space-between`：两端对齐，项目之间的间隔都相等。
+ `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
## `align-items`: 定义项目在交叉轴上如何对齐。
+ `flex-start`：交叉轴的起点对齐。
+ `flex-end`：交叉轴的终点对齐。
+ `center`：交叉轴的中点对齐。
+ `baseline`: 项目的第一行文字的基线对齐。
+ `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
## `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
+ `flex-start`：与交叉轴的起点对齐。
+ `flex-end`：与交叉轴的终点对齐。
+ `center`：与交叉轴的中点对齐。
+ `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
+ `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
+ `stretch`（默认值）：轴线占满整个交叉轴。
# 项目属性

## `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
## `flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。剩余空间分配的比例是项目这个元素占总值的比例
## `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小，于上一个相同，空间不足时按所占的比例缩小
## `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间。它决定主轴的大小浏览器根据这个属性来判断主轴还有多少剩余空间，默认auto
## `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`
## `align-self`允许不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`继承父元素的`align-items`属性
