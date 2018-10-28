import { Scene, Sprite, Path } from 'spritejs'

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
    this.nodeWidth = col / width
    this.nodeHeight = row / height

    // 存放蛇节点的队列
    this.snakeQuery = []

    this.food = new Sprite({
      anchor: [0.5, 0.5],
      border: [this.nodeWidth * 0.1, 'transparent'],
      size: [this.nodeWidth * 0.8, this.nodeHeight * 0.8],
      bgcolor: foodColor,
      borderRadius: this.nodeWidth / 2,
    })
    this.layer.appendChild(this.food)

    // 蛇各个部分base64代码
    this.headimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTcuMzI4NTEgNDYuNzc1ODlsNi40NzEyMS0yOC4wMDMxNyAyNi4yMDAyMy0xMi40NjI2IDI2LjIwMDI0IDEyLjQ2MjYgNi40NzEzMyAyOC4wMDMxNy0xOC4xMzE2NCAyMi40NTY5NUgzNS40NjAwNEwxNy4zMjg1MiA0Ni43NzU4OWguMDAwMDEtLjAwMDAyeiIgZmlsbD0iIzQ1NiIvPjxwYXRoIGZpbGw9IiM0NTYiIGQ9Ik0yNSA1MGg1MHY1MUgyNXoiLz48L3N2Zz4='
    this.footimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjNDU2IiBkPSJNMjUgMHY3NWg1MFYwSDI1Ii8+PC9zdmc+'
    this.bodyimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJub25lIiBkPSJNLTEtMWgxMDJ2MTAySC0xeiIvPjxnPjxwYXRoIGZpbGw9IiM0NTYiIGQ9Ik0yNSAwdjEwMGg1MFYwSDI1Ii8+PC9nPjwvc3ZnPg=='
    this.cornerimg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjUgMHY3NWg3NVYyNUg3NVYwSDUwIiBmaWxsPSIjNDU2Ii8+PC9zdmc+'

  }

  /**
   * 初始化
   *
   * @memberof View
   */
  init (data) {
    let { snake, food } = data
    this.snakeQuery = []
    this.food.attr({
      pos: this.caclPos(food)
    })

    for (let data of snake) {
      let node = this.createSnakeNode(data)
      this.snakeQuery.push(node)
      this.layer.appendChild(node.sprite)
    }
    this.setNodeStyle()
  }

  /**
  * 销毁数据
  *
  * @memberof Control
  */
  destroy () {
    for (let data of this.snakeQuery) {
      // //console.log(data);
      this.layer.removeChild(data.sprite)
    }
  }
  /**
   * 更新数据
   *
   * @param {*} data
   * @memberof View
   */
  updata (data) {
    let time = new Date().getTime()
    let { snake, food } = data
      , snakeTail = snake[snake.length - 1]
      , oldSnakeTail = this.snakeQuery[this.snakeQuery.length - 1]
    // 尾巴不相同说明蛇是在移动不是张长
    if (snakeTail.index !== oldSnakeTail.data.index) {
      this.isMove = true
      // 重用最后一个节点
      this.snakeQuery.pop()
      oldSnakeTail.data = snake[0]
      oldSnakeTail.sprite.attr({
        pos: this.caclPos(snake[0])
      })
      this.snakeQuery.unshift(oldSnakeTail)
    } else {
      this.isMove = false
      let newNode = this.createSnakeNode(snake[0])
      this.snakeQuery.unshift(newNode)
      this.layer.appendChild(newNode.sprite)
      this.food.attr({
        pos: this.caclPos(food)
      })
    }
    // 重新设置首尾节点样式
    this.setNodeStyle()
    // console.log('view')
    time = new Date().getTime() - time
    if(time > 16) {
      console.warn('view-time',time);
    }
  }
  /**
   * 设置节点样式
   *
   * @memberof View
   */
  setNodeStyle () {
    let head = this.snakeQuery[0]
    let head2 = this.snakeQuery[1]
    let head3 = this.snakeQuery[2]
    let tail = this.snakeQuery[this.snakeQuery.length - 1]
    let tail2 = this.snakeQuery[this.snakeQuery.length - 2]
    // let tail3 = this.snakeQuery[this.snakeQuery.length - 3]
    // 设置头
    switch (this.getNodeDirection(head.data, head2.data)) {
      case 'up':
        //console.log('head up');
        head.sprite.attr({
          textures: [{ src: this.headimg }],
          rotate: 0
        })
        break;
      case 'down':
        //console.log('head down')
        head.sprite.attr({
          textures: [{ src: this.headimg }],
          rotate: 180
        })
        break;
      case 'left':
        //console.log('head left');
        
        head.sprite.attr({
          textures: [{ src: this.headimg }],
          rotate: -90
        })
        break;
      case 'right':
        //console.log('head right');
        
        head.sprite.attr({
          textures: [{ src: this.headimg }],
          rotate: 90
        })
        break;

      default:
        break;
    }

    // 设置尾巴
    switch (this.getNodeDirection(tail.data, tail2.data)) {
      case 'up':
        //console.log('foot up');
        
        tail.sprite.attr({
          textures: [{ src: this.footimg }],
          rotate: 180
        })
        break;
      case 'down':
      //console.log('foot down');

      tail.sprite.attr({
          textures: [{ src: this.footimg }],
          rotate: 0
        })
        break;
      case 'left':
      ////console.log('foot left');

      tail.sprite.attr({
          textures: [{ src: this.footimg }],
          rotate: 90
        })
        break;
      case 'right':
      //console.log('foot right');

      tail.sprite.attr({
          textures: [{ src: this.footimg }],
          rotate: -90
        })
        break;

      default:
        break;
    }
    //console.log(`${this.getNodeDirection(head2.data, head.data)} ${this.getNodeDirection(head2.data, head3.data)}`);
    
    switch (`${this.getNodeDirection(head2.data, head.data)} ${this.getNodeDirection(head2.data, head3.data)}`) {
      case 'up right':
      case 'right up':
      //console.log('1')
      
        head2.sprite.attr({
          textures: [{ src: this.cornerimg }],
          rotate: 180
        })
        break;
      case 'down right':
      case 'right down':
      //console.log('2')

        head2.sprite.attr({
          textures: [{ src: this.cornerimg }],
          rotate: -90
        })
        break;
      case 'up left':
      case 'left up':
      //console.log('3')
      head2.sprite.attr({
          textures: [{ src: this.cornerimg }],
          rotate: 90
        })
        break;
      case 'down left':
      case 'left down':
      //console.log('4')
      head2.sprite.attr({
          textures: [{ src: this.cornerimg }],
          rotate: 0
        })
        break;
      case 'left right':
      case 'right left':
      //console.log('5')
      head2.sprite.attr({
          textures: [{ src: this.bodyimg }],
          rotate: 90
        })
        break;
      case 'up down':
      case 'down up':
      //console.log('6')
      head2.sprite.attr({
          textures: [{ src: this.bodyimg }],
          rotate: 0
        })
        break;
    
      default:
        break;
    }
    //console.log(this.snakeQuery);
    
  }

  /**
   * 获得主要节点在相对节点的那个方向
   *
   * @param {*} node 主要节点
   * @param {*} relativeNode 相对节点
   * @memberof View
   */
  getNodeDirection (node, relativeNode) {
    let dir = [
      {
        dir: 'up',
        offset: [0, -1]
      },
      {
        dir: 'down',
        offset: [0, 1]
      },
      {
        dir: 'left',
        offset: [-1, 0]
      },
      {
        dir: 'right',
        offset: [1, 0]
      },
    ]
    for (const data of dir) {
      if (node.x === relativeNode.x + data.offset[0]
        && node.y === relativeNode.y + data.offset[1]) {
        return data.dir
      }
    }
  }
  /**
   * 创建蛇节点
   *
   * @memberof View
   */
  createSnakeNode (node) {

    return {
      sprite: new Sprite({
        anchor: [0.5, 0.5],
        // border: [this.nodeWidth * 0.1, 'transparent'],
        // size: [this.nodeWidth * 0.8, this.nodeHeight * 0.8],
        // bgcolor: '#aaa',
        size: [this.nodeWidth, this.nodeHeight ],
        pos: this.caclPos(node),
      }),
      // sprite: path,
      data: node
    }
  }
  caclPos(node) {
    return [node.x * this.nodeWidth + this.nodeWidth / 2, node.y * this.nodeHeight + this.nodeHeight / 2]
  }
}