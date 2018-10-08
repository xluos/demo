import { Scene, Sprite } from 'spritejs'
import Chain from '@/lib/Chain'
export default class View {
  constructor(option = {}) {
    // 配置项
    let {
      width = 1000,
      height = 1000,
      row = 20,
      col = 20,
      el = 'body',
      snakeColor = '#456',
      foodColor = 'red'
    } = option

    // 创建容器
    this.scene = new Scene(el, {
      viewport: ['auto', 'auto'],
      resolution: [width, height],
    })
    // 创建画布
    this.layer = this.scene.layer();
    // 节点颜色
    this.snakeColor = snakeColor

    // 节点大小
    this.nodeWidth = width/col
    this.nodeHeight = height/row

    // 存放蛇节点的队列
    this.snakeQuery = new Chain()

    this.food = new Sprite({
      anchor: [0, 0],
      border: [this.nodeWidth * 0.2, 'transparent'],
      size: [this.nodeWidth * 0.8, this.nodeHeight * 0.8],
      bgcolor: foodColor,
      borderRadius: this.nodeWidth/2,
    })
    this.layer.append(this.food)
  }

  /**
   * 初始化
   *
   * @memberof View
   */
  init(data) {
    let { snake, food } = data
    this.snakeQuery = new Chain()
    this.food.attr({
      pos: [food.x * this.nodeWidth, food.y * this.nodeHeight]
    })

    for(let {data} of snake) { 
      let node = this.createSnakeNode(data)
      this.snakeQuery.push(node)
      this.layer.append(node.sprite)
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
    snakeTail = snake.last().data
    oldSnakeTail = this.snakeQuery.last().data
    // 尾巴不相同说明蛇是再移动不是张长
    if(snakeTail.index !== oldSnakeTail.data.index) {
      // 重用最后一个节点
      this.snakeQuery.pop()
      oldSnakeTail.data = snakeTail
      oldSnakeTail.sprite.attr({
        pos: [snakeTail.x * this.nodeWidth, snakeTail.y * this.nodeHeight]
      })
      this.snakeQuery.unshift(oldSnakeTail)
    } else {
      let newNode = this.createSnakeNode(snakeTail) 
      this.snakeQuery.unshift(newNode)
      this.layer.append(newNode.sprite)
      this.food.attr({
        pos: [food.x * this.nodeWidth, food.y * this.nodeHeight]
      })
    }
  }

  /**
   * 创建蛇节点
   *
   * @memberof View
   */
  createSnakeNode(node) {
    return {
      sprite: new Sprite({
        anchor: [0, 0],
        border: [this.nodeWidth * 0.2, 'transparent'],
        size: [this.nodeWidth * 0.8, this.nodeHeight * 0.8],
        pos: [node.x * this.nodeWidth, node.y * this.nodeHeight],
        bgcolor: this.snakeColor,
      }),
      data: node
    }
  }
}