import { Scene, Sprite, Path } from 'spritejs'

import Immmg from '../images/play@2x.png'
export default class View {
  constructor(option = {}) {
    // 配置项
    let {
      width = 20,
      height = 20,
      row = 1000,
      col = 1000,
      el = '#app',
      snakeColor = '#456',
      foodColor = 'red'
    } = option

    // 创建容器
    this.scene = new Scene(el, {
      viewport: ['auto', 'auto'],
      resolution: [row, col],
    })
    // 创建画布
    this.layer = this.scene.layer('snakeMap');
    // 节点颜色
    this.snakeColor = snakeColor

    // 节点大小
    this.nodeWidth = col/width
    this.nodeHeight = row/height

    // 存放蛇节点的队列
    this.snakeQuery = []

    this.food = new Sprite({
      anchor: [0, 0],
      border: [this.nodeWidth * 0.1, 'transparent'],
      size: [this.nodeWidth * 0.8, this.nodeHeight * 0.8],
      bgcolor: foodColor,
      borderRadius: this.nodeWidth/2,
    })
    this.layer.appendChild(this.food)

    // 蛇各个部分base64代码
    this.headimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjNDU2IiBkPSJNMTYuNjAxNjggNTEuMTM4OTdsNi42MTUxNy0zMS45MjkxNEw0OS45OTk5MyA1bDI2Ljc4MzA5IDE0LjIwOTgzIDYuNjE1MjkgMzEuOTI5MTQtMTguNTM1IDI1LjYwNTM2SDM1LjEzNjU2TDE2LjYwMTY4IDUxLjEzODk3eiIgc3Ryb2tlPSJudWxsIi8+PHBhdGggZmlsbD0iIzQ1NiIgZD0iTTI1IDYyLjgyNzFoNTB2MzYuNzE4NjJIMjVWNjIuODI3MXoiLz48L3N2Zz4='
    this.footimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjNDU2IiBkPSJNMjUgMHY3NWg1MFYwSDI1Ii8+PC9zdmc+'
    this.bodyimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJub25lIiBkPSJNLTEtMWgxMDJ2MTAySC0xeiIvPjxnPjxwYXRoIGZpbGw9IiM0NTYiIGQ9Ik0yNSAwdjEwMGg1MFYwSDI1Ii8+PC9nPjwvc3ZnPg=='
    this.cornerimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJub25lIiBkPSJNLTEtMWgxMDJ2MTAySC0xeiIvPjxnPjxwYXRoIGQ9Ik0yNSAwdjc1aDc1VjI1SDc2VjBINTEiIGZpbGw9IiM0NTYiLz48L2c+PC9zdmc+'
  }

  /**
   * 初始化
   *
   * @memberof View
   */
  init(data) {
    let { snake, food } = data
    this.snakeQuery = []
    this.food.attr({
      pos: [food.x * this.nodeWidth, food.y * this.nodeHeight]
    })

    for(let data of snake) { 
      let node = this.createSnakeNode(data)
      this.snakeQuery.push(node)
      this.layer.appendChild(node.sprite)
		}
  }

   /**
   * 销毁数据
   *
   * @memberof Control
   */
  destroy() {
    for(let data of this.snakeQuery) {
      // console.log(data);
      this.layer.removeChild(data.sprite)
		}
  }
  /**
   * 更新数据
   *
   * @param {*} data
   * @memberof View
   */
  updata(data) {
    let { snake, food } = data
      , snakeTail = snake[snake.length - 1]
      , oldSnakeTail = this.snakeQuery[this.snakeQuery.length - 1]
    // 尾巴不相同说明蛇是再移动不是张长
    if(snakeTail.index !== oldSnakeTail.data.index) {
      // 重用最后一个节点
      this.snakeQuery.pop()
      oldSnakeTail.data = snake[0]
      oldSnakeTail.sprite.attr({
        pos: [snake[0].x * this.nodeWidth, snake[0].y * this.nodeHeight]
      })
      this.snakeQuery.unshift(oldSnakeTail)
    } else {
      let newNode = this.createSnakeNode(snake[0])
      this.snakeQuery.unshift(newNode)
      this.layer.appendChild(newNode.sprite)
      this.food.attr({
        pos: [food.x * this.nodeWidth, food.y * this.nodeHeight]
      })
    }
    // console.log('view')
  }

  /**
   * 创建蛇节点
   *
   * @memberof View
   */
  createSnakeNode(node) {
    let path = new Sprite({
      anchor: [0, 0],
      size: [this.nodeWidth, this.nodeHeight],
      textures: [{src: this.headimg}],
      pos: [node.x * this.nodeWidth, node.y * this.nodeHeight]
    })
    return {
      sprite: new Sprite({
        anchor: [0, 0],
        border: [this.nodeWidth * 0.1, 'transparent'],
        size: [this.nodeWidth * 0.8, this.nodeHeight * 0.8],
        pos: [node.x * this.nodeWidth, node.y * this.nodeHeight],
        bgcolor: this.snakeColor,
      }),
      // sprite: path,
      data: node
    }
  }
}