// 贪吃蛇Model类
export default class Model {
  constructor ({width, height}={width:20, height: 20}) {
    // 蛇
    this.snake = {}
    this.snake.body = []
    // 重新封装一下链表方法, 修改蛇的同时自动修改映射
    this.snake.push = (node) => {
      Array.prototype.push.call(this.snake.body, node)
      this.updataMap(node.index, 'snake')
    }
    this.snake.pop = () => {
      let node = Array.prototype.pop.call(this.snake.body)
      this.updataMap(node.index, undefined)
      return node
    }
    this.snake.unshift = (node) => {
      Array.prototype.unshift.call(this.snake.body, node)
      this.updataMap(node.index, 'snake')
    }
    this.snake.shift = () => {
      let node = Array.prototype.shift.call(this.snake.body)
      this.updataMap(node.index, undefined)
      return node
    }
    this.snake.first = () => {
      return this.snake.body[0]
    }
    this.snake.last = () => {
      return this.snake.body[this.snake.body.length - 1]
    }
    // 食物, 设置食物的时候自动更新映射
    Object.defineProperty(this, 'food', {
      get: () => {
        return this._food
      },
      set: ({ x, y, index }) => {
        this.updataMap(index, 'food')
        this._food = { x, y, index }
      }
    })

    // 地图的宽高
    this.width = width
    this.height = height
    // 地图索引映射表
    this.map = []

    // 方向偏移
    this.dirMap = {
      'UP': [0, -1],
      'DOWN': [0, 1],
      'LEFT': [-1, 0],
      'RIGHT': [1, 0]
    }
    // 脏检查标志（数据有更新）
    this.dirty = false;
    // 游戏结束标志
    this.GAMEOVER = undefined
  }

  
  /**
   * 数据初始化
   *
   * @memberof Model
   */
  init() {
    this.snake.body = []
    this.map = []
    // 脏检查标志（数据有更新）
    this.dirty = false;
    // 游戏结束标志
    this.GAMEOVER = undefined
    // 随机蛇的位置
    let col = 5 || Math.floor(Math.random() * (this.width * 0.66))
      , row = 5 || Math.floor(Math.random() * (this.width * 0.66))
    // 随机一个蛇
    for(let i = col, len = col + 1; i < len; i++) {
      this.snake.push({
        x: i,
        y: row,
        index: this.width * row + i
      }) 
    }
    // 随机投食物
    this.feed();
  }
  
  /**
   * 销毁数据
   *
   * @memberof Control
   */
  destroy() {

  }

  /**
   * 清除脏检查标志
   *
   * @memberof Model
   */
  clearDirty() {
    this.dirty = false;
  }


  /**
   * 更新Map
   *
   * @param {*} index
   * @param {*} fill
   * @memberof Model
   */
  updataMap(index, fill) {
    this.map[index] = fill;
  }

  /**
   * 蛇移动一格
   *
   * @param {*} direction 移动方向
   * @memberof Model
   */
  move(direction) {
    direction = direction.toLocaleUpperCase()
    let dir = this.dirMap[direction]
      , snakeHead = this.snake.first()
      , nextNode = this.getNextNode(snakeHead, dir)
      , nextNodeType = this.getNodeType(nextNode)
    switch (nextNodeType) {
      // 撞到自身或墙
      case 'snake':
      case 'wall':
        this.GAMEOVER = nextNodeType
        break;
      // 吃食
      case 'food':
        this.dirty = true;
        this.eat(nextNode)
        break;
      // 默认情况蛇前进一步
      default:
        this.dirty = true;
        this.snake.pop() & this.snake.unshift(nextNode); 
        break;
    }
    // console.log('move')
    
  }

  getNextNode(snakeHead, dir) {
    return this.createNode(snakeHead.x + dir[0], snakeHead.y + dir[1])
  }

  /**
   * 吃食
   *
   * @param {*} food 
   * @memberof Model
   */
  eat(food) {
    this.snake.unshift(food)
    // 重新投喂食物
    this.feed()
  }
  /**
   * 判断节点再当前地图上的类型
   *
   * @param {*} node 节点
   * @memberof Model
   */
  getNodeType(node) {
    let type = this.map[node.index]
    // 判断是否越界也就是撞墙
    if(node.x >=0 && node.x < this.width && node.y >=0 && node.y < this.height) {
      // 咬尾不会撞自身
      if(type === 'snake' && this.snake.last().index === node.index) {
        type = undefined;
      }
      return type
    } else {
      return 'wall'
    }
  }

  /**
   * 创建一个贪吃蛇节点
   *
   * @param {*} x 横坐标
   * @param {*} y 纵坐标
   * @returns 节点对象
   * @memberof Model
   */
  createNode(x,y) {
    return {
      x,
      y,
      index: this.width * y + x
    }
  }

  /**
   * 随机获取范围内的index值
   * 
   * @returns 不超过this.width * this.height的值
   * @memberof Model
   */
  randomFoodIndex() {
    return Math.floor(Math.random() * (this.width * this.height))
  }

  /**
   * 随机投喂食物
   *
   * @memberof Model
   */
  feed() {
    let index;
    while(this.map[index = this.randomFoodIndex()]);
    this.food = {
      x: index%this.width,
      y: Math.floor(index/this.height),
      index
    }
  }
}
