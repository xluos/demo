# 前言
从库的名字就能看出来，这库是用来存放我平时学习时候的小练习用的，这些小demo我会在下面列出来

# NEXT学位Demo
这是参加腾讯课堂NEXT学位10天训练营时候建立的项目，最后有一个作业的大项目，还有一些零零碎碎的小demo，可以说这是一个对新手来说挺不错的项目，10天时间对前端大致有一个了解，还做了一个小项目。**新手入门推荐**

有兴趣的可以去看一下我的笔记：[传送门](https://github.com/xluos/note-and-blog/blob/master/%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/NEXT%E5%AD%A6%E4%BD%8D%E7%AC%94%E8%AE%B0/%E5%8D%81%E5%A4%A9%E7%AC%94%E8%AE%B0%E5%90%88%E9%9B%86.md)

下面是学习时零零碎碎实验做的小Demo
## 大作业-滚动简历
很有意思的一个项目，做一个滚动简历。本来想用原生再实现一次的，结果发现jQ动画用原生没法儿弄只好暂时放下。

+ [Demo](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%AE%80%E5%8E%86/index.html)
+ [代码地址](https://github.com/xluos/demo/tree/gh-pages/NEXT%E5%AD%A6%E4%BD%8DDemo/%E5%93%8D%E5%BA%94%E5%BC%8F%E7%AE%80%E5%8E%86)

## 零碎小Demo
+ [transition动画](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/transition.html)
+ [animation动画direction属性对比](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/animation-direction.html)
+ [一个css动画实现的时钟](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/CSS-steps()-clock.html)
+ [使用steps()实现打字动画效果](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/TextEffect.html)
+ [简单的loading](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/loading.html)
+ [DOM操作](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/DOM.html)
+ [DocumentFragment加速实验，对比有无Fragment时添加元素效率的区别](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/DocumentFragment%E5%8A%A0%E9%80%9F%E5%AE%9E%E9%AA%8C.html)
+ [两个css小效果，掘金学来的](https://xluos.github.io/demo/NEXT%E5%AD%A6%E4%BD%8DDemo/css-cell.html)

# 圣杯和双飞翼布局
做IFE的时候遇到的，挺经典的两种布局就整理了一波。两种布局达到效果上基本相同，都是两边两栏宽度固定，中间栏宽度自适应。在HTML结构上中间栏在最前面保证了最先渲染中间提升性能（因为这两种布局都比较老，我认为在现代浏览器中这点儿性能优化效果并不是很大），并且兼容性良好。
## 具体分析看这里：[传送门](https://github.com/xluos/note-and-blog/blob/master/%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/Web/%E6%B5%85%E8%B0%88%E9%9D%A2%E8%AF%95%E4%B8%AD%E5%B8%B8%E8%80%83%E7%9A%84%E4%B8%A4%E7%A7%8D%E7%BB%8F%E5%85%B8%E5%B8%83%E5%B1%80.md)
## Demo和代码
+ 圣杯布局[Demo](https://xluos.github.io/demo/%E5%9C%A3%E6%9D%AF%E5%92%8C%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80/%E5%9C%A3%E6%9D%AF.html)、[代码](https://github.com/xluos/demo/blob/gh-pages/%E5%9C%A3%E6%9D%AF%E5%92%8C%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80/%E5%9C%A3%E6%9D%AF.html)

+ 双飞翼布局[Demo](https://xluos.github.io/demo/%E5%9C%A3%E6%9D%AF%E5%92%8C%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80/%E5%8F%8C%E9%A3%9E%E7%BF%BC.html)、[代码](https://github.com/xluos/demo/blob/gh-pages/%E5%9C%A3%E6%9D%AF%E5%92%8C%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80/%E5%8F%8C%E9%A3%9E%E7%BF%BC.html)

# PSD到HTML切图练习
本来看到这个课是想自己直接切的，因为之前也切过几个。后来想想还是跟着视频的思路走吧，果然还是学到了不少，自己之前毕竟是摸索的野路子，很不正规。不过跟着视频来切的真心累，现在想来还是应该先看一遍然后自己照着思路实现可能会更好。总结一下学到的东西吧：
+ reset重置样式单独放，不要用通配符
+ 要考虑一个页面的公共样式，单独写出来方便以后维护
+ 清除浮动和固定块居中这样常用的单独写一个类出来，用的时候直接添加会更方便，减少代码冗余
+ 先搭好页面框架再填样式

+ [Demo](https://xluos.github.io/demo/PSD%E5%88%B0HTML%E5%88%87%E5%9B%BE%E7%BB%83%E4%B9%A0/)
+ [代码地址](https://github.com/xluos/demo/tree/gh-pages/PSD%E5%88%B0HTML%E5%88%87%E5%9B%BE%E7%BB%83%E4%B9%A0)

# CSS实现Tab页切换
切图的时候碰到的，想着切图就尽量先不谢js试试能不能实现效果，搜了一些办法之后选择了**利用`label和radio`的绑定关系和`radio选中时的:checked`来实现效果**


# 2018进度条 [地址](http://progress.xluos.com/)

突发奇想想要做的一个东西，有空看看也能给自己来点儿紧迫感，实现起来还是很容易的获取当前时间和今年开始的时间算出百分比设置width就好了。

# Flexbox演示站 [地址](https://xluos.github.io/demo/flexbox/)

可以通过动态的点击flexbox属性可以实时看到各个属性的效果，有助于理解各个属性。

友好的提示，鼠标放在选项上面悬停显示各个属性效果。

# Vue-Todos [地址](https://xluos.github.io/demo/VueTodos/)

初学Vue的产物，把IFE基础学院做完等待新学期的过程中就去看了Vue的文档，看完文档按照惯例做了这么一个Demo，好像学Vue的都推荐做这么一个东西。用上Vue确实很方便，甚至说写页面样式耗费的功夫要超过逻辑本身，最终利用loaclstorage把实现数组本地存取。实现的功能有：
+ 回车或点击按钮添加一条
+ 右边按钮可以删除当前条目
+ 左边按钮标记为已完成
+ 上边箭头一键全部完成
+ 双击可编辑
+ 添加为空时不添加，编辑后为空则删除
+ 下方显示待完成数量
+ 可按照全部、未完成、已完成分类显示
+ 可一键删除所有完成项目
+ 正常刷新和关闭页面时，将数据保存到loaclstorage中。
+ 打开时如果loaclstorage存有数据，则自动加载loaclstorage中的数据