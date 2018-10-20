import Event from '../lib/events'
import Ticker from 'ticker-js'
export default class Control{
  constructor(view, model){
    this.view = view
    this.model = model

    // 事件管理
    this.event = new Event()

    // 
    this.ticker = new Ticker(2)
    

    this.ticker.on('updata', data=> console.log(data))

    this.ticker.on('render', (data)=> {
      this.updata()
    })
    // 四个方向的反方向
		this.fourDirections = {
      "left": 'right',
      "up": 'down', 
      "right": 'left', 
      "down": 'up'
    }

    // 储存方向操作
    this.directionQuery = []

    // 当前方向
    this.direction = 'right'

    // 游戏结束标志位
    this.GAMEOVER = false

    // 设置速度与帧数绑定

    Object.defineProperty(this, 'speed', {
      get: () => {
        return this._speed
      },
      set: (speed) => {
        this._speed = speed
        this.ticker.setFps(speed)
      }
    })

    this.eatCount = 0

    this.status = false
  }

  /**
   * 初始化
   *
   * @memberof Control
   */
  init() {
    this.model.init()
    this.food = this.model.food
    this.view.init({
      snake: this.model.snake.body,
      food: this.model.food
    })

    this.directionQuery.length = 0
    // 当前方向
    this.direction = 'right'

    this.ticker.stop()

    this.GAMEOVER = false

    this.eatCount = 0
  }

  /**
   * 转向
   *
   * @param {*} direction 方向
   * @memberof Control
   */
  turn(direction) { 
    if(!this.status) return ;
    // 验证参数是否合法
    if(!this.fourDirections[direction]) {
      return ;
    }
    let preDirection = this.directionQuery[this.directionQuery.length - 1] || this.direction
    // 最多储存后4步的操作,且当前方向不与其上一步方向相同或相反
    if(  this.directionQuery.length < 4
      && preDirection !== direction
      && this.fourDirections[preDirection] !== direction) {
      
      this.directionQuery.push(direction)
    }
  }

  
  /**
   * 暂停
   *
   * @memberof Control
   */
  pause() {
    this.status = false
    this.ticker.stop()
  }

  /**
   * 恢复
   *
   * @memberof Control
   */
  resume() {
    this.status = true
    this.ticker.start()
  }

  /**
   * 开始
   *
   * @memberof Control
   */
  start() {
    this.ticker.start()
  }

   /**
   * 销毁数据
   *
   * @memberof Control
   */
  destroy() {
    this.model.destroy()
    this.view.destroy()
  }

  /**
   * 重新开始
   *
   * @memberof Control
   */
  restart() {
    this.destroy()
    this.init()
  }

  /**
   * 游戏结束
   *
   * @memberof Control
   */
  gameover(type) {
    console.log('gm',type);
    
    this.GAMEOVER = true;
    this.pause()
    this.event.dispatch('gameover', type)
  }

  /**
   * 同步更新V/M数据和状态
   *
   * @memberof Control
   */
  updata() {
    this.direction = this.directionQuery.shift() || this.direction
    this.model.move(this.direction)
    // console.log(JSON.stringify(this.model.snake.body[0]));
    if(this.model.GAMEOVER) {
      this.gameover(this.model.GAMEOVER);
      return 
    }

    if(this.model.dirty) {
      let hasEatEvent = false;
      if(this.food.index !== this.model.food.index) {
        this.food = this.model.food
        hasEatEvent = true
        this.event.dispatch('before-eat')
      }
      this.view.updata({
        snake: this.model.snake.body,
        food: this.model.food
      })
      // this.event.dispatch('render', this.render(this.model.map))
      hasEatEvent && this.event.dispatch('eat', ++this.eatCount)

      this.model.clearDirty()
    }
  }
  render(map) {
    let text = ''
    for(let i=0;i<20;i++) {
      for(let j = 0; j < 20; j++) {
        if(map[i * 20 + j] === undefined) {
          text += ' '
        } else if(map[i * 20 + j] === 'snake') {
          text += 'S'
        } else if(map[i * 20 + j] === 'food') {
          text += 'F'
        }
      }
      text += '\n'
    }
    return text
  }

}