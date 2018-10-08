

export default class Control{
  constructor(view,model){
    this.view = view
    this.model = model
    // 四个方向的反方向
		this.fourDirections = {
      "left": 'right',
      "up": 'down', 
      "right": 'left', 
      "down": 'up'
    }
  }

  /**
   * 初始化
   *
   * @memberof Control
   */
  init() {

  }

  /**
   * 转向
   *
   * @param {*} direction 方向
   * @memberof Control
   */
  turn(direction) {

  }

  /**
   * 判断方向是否相反
   *
   * @param {*} directionA
   * @param {*} directionB
   * @returns
   * @memberof Control
   */
  isAdverse(directionA, directionB) {
		let indexA = this.fourDirections.indexOf(directionA), 
			indexB = this.fourDirections.indexOf(directionB); 
		if(Math.abs(indexA - indexB) === 2) { 
			return true; 
		}
		return false; 
  }
  
  /**
   * 暂停
   *
   * @memberof Control
   */
  pause() {

  }

  /**
   * 恢复
   *
   * @memberof Control
   */
  resume() {

  }

  /**
   * 开始
   *
   * @memberof Control
   */
  start() {

  }

  /**
   * 重新开始
   *
   * @memberof Control
   */
  restart() {

  }

  /**
   * 游戏结束
   *
   * @memberof Control
   */
  gameover() {
    
  }

  /**
   * 同步更新V/M数据和状态
   *
   * @memberof Control
   */
  updata() {

  }
}