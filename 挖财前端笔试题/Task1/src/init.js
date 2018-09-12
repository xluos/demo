/**
 * 重新设置方块盒子距离视口的距离
 *
 */
function resize() {
  let bcr = BOX.getBoundingClientRect();
  BOX_X = bcr.left;
  BOX_Y = bcr.top;

}
resize()

/**
 * 浏览器大小发生变化时重新计算，使用函数防抖提升性能
 *
 * @param {*} e 事件对象
 */
window.onresize = debounce(resize)


/**
 * 加载完毕将所有方块设置成绝对定位
 *
 */
window.onload = function () {
  // console.log(item);
  Array.from(ITEM).forEach((ele, index) => {
    // 因为dom操作属于异步操作，所以使用setTimeout将操作也放入一部队列
    setTimeout((x, y, i) => {
      ele.dataset.x = x;
      ele.dataset.y = y;
      ele.dataset.index = i
      ele.style = `position: absolute;left:${x}px;top:${y}px`;
    }, 0, ele.offsetLeft, ele.offsetTop, index);
  })
}