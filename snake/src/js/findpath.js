export default class FindPath {
  constructor(option) {
    let {
      width = 20,
      height = 20
    } = option
    this.width = width
    this.height = height
    this.start = null
    this.end = null
    this.queue = []
    this.vis = []
    this.pre = []
    this.g = []
    this.dir = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]
  }
  getNextNode (snake, food) {
    this.snake = snake
    this.build(snake, food)
    
    //console.log('找食物food', food);  
    let next = this.Astar(this.cmpMin)
    // let next = this.bfs()
    // 判断直奔食物找到的路是否安全
    if (this.isSecurity(next)) {
      //console.log('追食物')
      return {
        flag: true,
        node: next.pop()
      }
    } else {
      // 不安全的话继续朝尾巴方向走
      // 追尾巴绕路走，腾出更多的空间
      this.build(snake, snake[snake.length - 1])
      
      // 食物也标记一下，防止食物刚好出现在追蛇尾的路上
      this.vis[food.index] = true
      next = this.Astar(this.cmpMax)
      
      // 还是没有找到路
      if (next.length === 0) {
        // 随便走一步
        //console.log('随便走', this.randomStep(snake));
        return {
          flag: true,
          node: this.randomStep(snake).pop()
        }
      } else {
        //console.log('追尾巴')
        
        return {
          flag: true,
          node: next.pop()
        }
      }
    }
    // 如果程序运行到这里说明怎么都找不到路了
    return {
      flag: false,
      node: null
    }
  }
  /**
   * 初始化
   *
   * @memberof FindPath
   */
  init () {
    this.start = null
    this.end = null
    this.queue = []
    this.vis = []
    this.pre = []
  }
  /**
   * 构建图
   *
   * @param {*} snake 蛇
   * @param {*} food 食物
   * @memberof FindPath
   */
  build (snake, food) {
    this.init()
    // 设置起点和重点
    this.start = Object.assign({}, snake[0])
    this.end = Object.assign({}, food)
    // 记录蛇节点为不可走节点
    let len = snake.length
    for (let i = 0; i < len; i++) {
      this.vis[snake[i].index] = true
    }
    // 咬尾搜索的时候尾巴被标记导致找不到
    // this.vis[food.index] = false
  }
  /**
   * 根据搜索结果重建路径
   *
   * @memberof FindPath
   */
  reconstructPath () {
    let index = this.end.index
    // 存个路径方便改
    let next = []
    next.push(this.end)
    while (this.pre[index] && this.pre[index].index !== this.start.index) {
      next.push(this.pre[index])
      index = this.pre[index].index
    }
    return next
  }
  /**
   * 判断节点是否安全
   *
   * @param {*} node
   * @memberof FindPath
   */
  judge (node) {
    return (!this.vis[node.index] || this.end.index === node.index) 
        && node.x >= 0 && node.x < this.width 
        && node.y >= 0 && node.y < this.height
  }
  /**
   * 计算两个节点之间的曼哈顿距离
   *
   * @param {*} p 
   * @param {*} q
   * @memberof FindPath
   */
  h (p, q) {
    return Math.abs(q.x - p.x) + Math.abs(q.y - p.y)
  }
  getEndH (node) {
    return this.h(node, this.end)
  }
  /**
   * A*搜索算法
   *
   * @param {*} cmp 比较函数
   * @memberof FindPath
   */
  Astar (cmp) {
    let q = this.start
    let p = {}
    q.g = 0
    q.h = this.getEndH(q)
    q.f = q.h
    this.queue.push(q)
    while (this.queue.length) {
      q = this.queue.shift()
      // 找到终点,放到外面以防死循环
      if (q.index === this.end.index) {
        return this.reconstructPath(q)
      }
      for (let i = 0; i < 4; i++) {
        p.x = q.x + this.dir[i][0]
        p.y = q.y + this.dir[i][1]
        p.index = p.y * this.width + p.x
        if (this.judge(p)) {
          // 指定父节点
          this.pre[p.index] = { ...q }
          // 标记为不可走
          this.vis[p.index] = true
          // 计算g、h、f
          p.g = q.g + 1
          p.h = this.getEndH(p)
          p.f = p.g + p.h
          this.queue.push({ ...p })
        }
      }
      // 原本应该用优先队列实现，然而不太好写由于没有性能要求先用Hack写法  TODO: 后续优化写法
      this.queue.sort((a, b) => cmp(a.f, b.f))
    }
    // 如果走到这儿了说明没有找到可走的路
    return []
  }
  randomStep (snake) {
    this.build(snake, snake[snake.length - 1])
    let q = this.start
    let p = {}
    let num = [0, 1, 2, 3]
    // 四个方向乱序查找
    // this.shuffle(num)
    for (let i = 0; i < 4; i++) {
      p.x = q.x + this.dir[num[i]][0]
      p.y = q.y + this.dir[num[i]][1]
      p.index = p.y * this.width + p.x

      if (this.judge(p)) {
        return [p]
      }
    }
    return []
  }
  /**
   * 找到的路径是否安全
   *
   * @memberof FindPath
   */
  isSecurity (path) {
    // 没有路径直接返回不安全
    if(path.length === 0) return false
    // 长度小于10不用判断
    if(this.snake.length < 10) return true
    let newSnakeBody = []
    if (path.length >= this.snake.length + 1) {
      // 路径比原来的蛇长，截取蛇的长度
      newSnakeBody = path.slice(0, this.snake.length + 1)
    } else {
      newSnakeBody = path.concat(this.snake.slice(0, this.snake.length - (path.length-1)))
    }
    //console.log('path', JSON.parse(JSON.stringify(path)));
    //console.log('snake', JSON.parse(JSON.stringify(this.snake)));
    //console.log('new', JSON.parse(JSON.stringify(newSnakeBody)));
    // return true
    this.build(newSnakeBody, newSnakeBody[newSnakeBody.length - 1])
    let pat = this.Astar(this.cmpMax)
    // if(pat.length === 0) //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    return  pat.length > 0
  }
  /**
   * 升序比较函数
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof FindPath
   */
  cmpMin (a, b) {
    return a - b
  }
  /**
   * 降序比较函数
   *
   * @param {*} a
   * @param {*} b
   * @returns
   * @memberof FindPath
   */
  cmpMax (a, b) {
    return b - a
  }
  /**
   * 数组乱序
   *
   * @param {*} arr
   * @memberof FindPath
   */
  shuffle (arr) {
    let i = arr.length;
    while (i) {
      let j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
  }
  /**
   * 广搜
   *
   * @returns
   * @memberof FindPath
   */
  bfs () {
    let q = this.start
    let p = {}
    this.queue.push(q)
    while (this.queue.length) {
      q = this.queue.shift()
      for (let i = 0; i < 4; i++) {
        p.x = q.x + this.dir[i][0]
        p.y = q.y + this.dir[i][1]
        p.index = p.y * this.width + p.x
        if (this.judge(p)) {
          // 指定父节点
          this.pre[p.index] = { ...q }
          // 找到终点
          if (p.index === this.end.index) {
            return this.reconstructPath(p)
          }
          // 标记为不可走
          this.vis[p.index] = true
          this.queue.push({ ...p })
        }
      }
    }
    // 如果走到这儿了说明没有找到可走的路
    return []
  }
}