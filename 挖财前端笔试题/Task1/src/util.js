/**
 * 函数防抖
 *
 * @param {*} fn 需要包装的函数
 * @param {number} [interval=300] 延迟时间
 * @returns 防抖包装过的函数
 */
export function debounce(fn, interval = 300) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}

/**
 * 函数节流包装
 *
 * @param {*} fn 需要包装的函数
 * @param {number} [interval=300] 多少时间触发一次
 * @returns 包装好的函数
 */
export function throttle(fn, interval = 300) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}

/**
 * 设置元素位置
 *
 * @export
 * @param {*} element DOM
 * @param {*} x 鼠标位置
 * @param {*} y 鼠标位置
 */
export function setPosition(element, x, y) {
  element.style.top = `${y}px`
  element.style.left = `${x}px`
}

/**
 * 根据dom属性中的位置重置位置
 *
 * @export
 * @param {*} target 重置位置的dom元素
 */
export function reset(target) {
  setPosition(target, parseFloat(target.dataset.x), parseFloat(target.dataset.y))
}

/**
 * 创建工具函数
 *
 * @export
 * @param {*} ITEM 方块的dom数组
 * @returns 工具对象
 */
export function createTool(ITEM) {
  let viewToReal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  return {
    /**
     * 判断是否是头元素
     *
     * @param {*} element dom元素
     * @returns {bool} 
     */
    isHead: function (element) {      
      return !!element.dataset.ishead
    },
    /**
     * 根据位置找到真实的dom元素
     *
     * @param {*} index
     * @returns 真实的dom元素
     */
    getDom: function (index) {
      return ITEM[viewToReal[index]]
    },
    /**
     * 传入两个坐标，将坐标上的dom位置交换
     *
     * @param {*} index 鼠标所在位置的方块索引
     * @param {*} targetIndex 被拖动的方块索引
     */
    swap: function (index, targetIndex) {
      let z_index = viewToReal[index]
        , z_indexTarget = viewToReal[targetIndex]
      let item = ITEM[z_index]
        , target = ITEM[z_indexTarget]
        , t_x = item.dataset.x
        , t_y = item.dataset.y;
      item.dataset.x = target.dataset.x;
      item.dataset.y = target.dataset.y;
      target.dataset.x = t_x;
      target.dataset.y = t_y;

      viewToReal[index] = z_indexTarget
      viewToReal[targetIndex] = z_index
      item.dataset.index = targetIndex
      target.dataset.index = index
      reset(item);
      reset(target);
    }
  }

}