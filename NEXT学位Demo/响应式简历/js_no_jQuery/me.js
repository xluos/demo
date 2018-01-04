var $peopleContainer = document.getElementById('people-content');
var $people = document.getElementsByClassName('people')[0];
var $blocks = document.getElementsByClassName('block');
// 获取容器高度
var contentHeight = document.getElementsByClassName('content')[0].scrollHeight;

var ans = 100;

// 动作常量
var actionFrameMap = {
  static: 0,
  walk: 2,
  stand: 3,
  jump: 1,
};

var Me = {
  init: function() {
    this.direction = 'right';
    this.oneFrameSize = 70; // 每个动作图片的尺寸
    this.oneFrameDuration = 200; // 每个动作的间隔
    this.jumpBuffer = 150; // 跳跃高度差
    this.peopleBottomEdge = 60; // 人物距离底部距离
    this.peopleRightEdge = 275; // 人物右边距离边界距离
    this.peopleLeftEdge = 200; // 人物左边距离边界距离
    this.isJumping = false;
    this.isMoving = false;
  },
  /**
   * 更新方向
   * @param {Number} distant 滚动位移大小
   */
  setDirection: function(distant) {
    if (distant > 0) {
      this.direction = 'right';
      $people.style.top = '0';
    } else {
      this.direction = 'left';
      $people.style.top = '-105px';
    }
  },

  /**
   * 设置帧图片
   */
  setFrame: function (action) {
    // console.log('frame:',action);
    var nextFrameLeft = - actionFrameMap[action] * this.oneFrameSize;
    // console.log(actionFrameMap[action]);
    // console.log(this.oneFrameSize);
    // console.log(nextFrameLeft);
    $people.style.left = nextFrameLeft + 'px';
    
  },

  /**
   * 切换人物动作帧
   */
  switchFrames: function(frames, callback) {
    var self = this;
    
    // 如果没有下一帧
    if (frames.length === 0 || !frames[0]) {
      callback();
      return;
    }
    
    // 获取下一帧
    var nextAction = frames.shift();
    // console.log("nextAction:",nextAction);
    this.setFrame(nextAction);
    
    // 间隔后，切换下一个
    this.shiftFrameTimer = setTimeout(function() {
      self.switchFrames(frames, callback);
    }, this.oneFrameDuration);
  },

  /**
   * 人物行走
   */
  walk: function() {
    var self = this;
    // 如果已经移动，则不添加
    // console.log('isJumping', this.isJumping);
    // console.log(' this.isMoving ',  this.isMoving);
    
    if (this.isJumping || this.isMoving) {
      return;
    }
    this.isMoving = true;
    // 设置一帧动作
    
    var nextFrames = ['walk', 'stand'];
    this.switchFrames(nextFrames, function() {
      self.isMoving = false;
      $people.style.left = '0';
    });
  },

};