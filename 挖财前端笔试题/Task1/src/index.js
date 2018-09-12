import {
  debounce
  , setPosition
  , reset
  , createTool
} from './util'
import Chain from './chain'
import './index.css'

const BOX = document.querySelector('.box');
const ITEM = document.querySelectorAll('.item');
const ITEM_W = 180
const ITEM_H = 120
// 存放box距离视口左边和上边的距离
let BOX_X, BOX_Y

// 操作方块工具类
let Tool = createTool(ITEM);

// 创建责任链
let run = new Chain(headToHead, this)
    run.setNextSuccessor(new Chain(headToNumber, this))
       .setNextSuccessor(new Chain(numberToNumber, this))
       .setNextSuccessor(new Chain(noSwap, this))
// 标记按键是否按下
window.isMousedown = false;

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

/**
 * 鼠标按下的事件
 *
 */
BOX.addEventListener('mousedown', e => {
  window.isMousedown = true;
  window.moveTarget = e.target
  e.target.dataset.mousedown_x = e.clientX
  e.target.dataset.mousedown_y = e.clientY
  e.target.style.zIndex = 1
})


/**
 * 鼠标移动
 *
 */
document.body.addEventListener('mousemove', e => {
  if (!window.isMousedown) {
    return;
  }
  if (window.moveTarget) {
    let target = window.moveTarget;
    let x = parseFloat(target.dataset.x) - parseFloat(target.dataset.mousedown_x) + e.clientX
      , y = parseFloat(target.dataset.y) - parseFloat(target.dataset.mousedown_y) + e.clientY;
    setPosition(window.moveTarget, x, y)
  }
})


/**
 * 按键松开
 *
 */
document.body.addEventListener('mouseup', e => {
  window.isMousedown = false;
  if (window.moveTarget) {
    let target = window.moveTarget
    let x = Math.floor((e.clientX - BOX_X) / ITEM_W), y = Math.floor((e.clientY - BOX_Y) / ITEM_H)
      , index = x + y * 4;

    // 判断鼠标是否在别的方块上
    if (x >= 0 && y >= 0 && index < 16 && target.dataset.index !== index) {
      run.passRequest(index,target);
    } else {
      // 回到自己原来的位置
      reset(target);
    }
    target.style.zIndex = 0
    window.moveTarget = null
  }
})




// 各种交换情况的函数


/**
 * 表头与表头之间，两列相互交换
 *
 * @param {*} index 被放置的坐标
 * @param {*} target 被拖动的元素
 */
function headToHead(index, target) {
  if (Tool.isHead(Tool.getDom(index)) && Tool.isHead(target)) {
    let index_col = index % 4
      , target_col = target.dataset.index % 4;
    for (let i = 0; i < 4; i++) {
      Tool.swap(i * 4 + index_col, i * 4 + target_col)
    }
    return 'noNext'
  } else {
    return 'nextSuccessor'
  }
}


/**
 * 表头与普通数字之间，两行相互交换
 *
 * @param {*} index 被放置的坐标
 * @param {*} target 被拖动的元素
 */
function headToNumber(index, target) {
  if (!Tool.isHead(Tool.getDom(index)) && Tool.isHead(target)) {
    let index_col = Math.floor(index / 4)
      , target_col = Math.floor(target.dataset.index / 4);
    for (let i = 0; i < 4; i++) {
      Tool.swap(i + index_col * 4, i + target_col * 4)
    }
    return 'noNext'
  } else {
    return 'nextSuccessor'
  }
}

/**
 * 数字与数字之间，两个方块相互交换
 *
 * @param {*} index 被放置的坐标
 * @param {*} target 被拖动的元素
 */
function numberToNumber(index, target) {
  if (!Tool.isHead(Tool.getDom(index)) && !Tool.isHead(target)) {
      Tool.swap(index, target.dataset.index)
    return 'noNext'
  } else {
    return 'nextSuccessor'
  }
}

/**
 * 不符合的情况拒绝交换
 *
 * @param {*} index 被放置的坐标
 * @param {*} target 被拖动的元素
 */
function noSwap(index, target) {
  reset(target)
}
