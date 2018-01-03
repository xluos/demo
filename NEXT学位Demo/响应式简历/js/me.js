var $peopleContainer = $('#people-content');
var $people = $('.people');
var $blocks = $('.block');
// 获取容器高度
var contentHeight = $('.content').height();
console.log("contentHeight",contentHeight);
console.log('contentw',$('.content').width());
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
      $people.css('top', 0);
    } else {
      this.direction = 'left';
      $people.css('top', '-105px');
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
    $people.css({
      left: nextFrameLeft
    });
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
      $people.css('left', 0);
    });
  },

/**
   * 人物跳跃
   * @param {Dom} item 对比障碍物
   * @param {Boolean} downBlock 是否需要落到障碍物
   */
  jump: function(item, downBlock) {
    var self = this;
    this.setFrame('jump');

    this.isJumping = true;

    var bottom = contentHeight - item.offsetTop + this.jumpBuffer;
    console.log("contentHeight = ",contentHeight);
    console.log("item.offsetTop = ",item.offsetTop);
    console.log("this.jumpBuffer = ",this.jumpBuffer);
    console.log("bottom = ",bottom);
    
    $peopleContainer.stop().animate({
      bottom: bottom
    }, 200, function() {
      self.downBlock(item);
    });
    
  },

  /**
   * 降落到指定障碍物
   */
  downBlock: function(item) {
    var self = this;
    // 下降高度，需要注意图片的边距，这里需要多减 14
    var bottom = contentHeight - item.offsetTop - 9;
    // console.log("bottom",bottom);
    
    $peopleContainer.stop().animate({
      bottom: bottom
    }, 200, function() {
      // 切换状态
      self.setFrame('static');
      self.isJumping = false;
    });
  },

  /**
   * 下降函数
   */
  drop: function(item) {
    var self = this;
    self.setFrame('jump');
    
    $peopleContainer.stop().animate({
        bottom: this.peopleBottomEdge,
    }, 200, function() {
      // 切换状态
      self.setFrame('static');
      self.isJumping = false;
    });
  },

  /**
   * 判断是否即将接触到障碍物
   */
  checkJump: function(curPosition, prePosition) {
    var self = this;

    // 遍历所有的障碍物，判断是否需要跳跃
    for (var i = 0, len = $blocks.length; i < len; i++) {
      var item = $blocks[i];
      // 获取元素的位置和宽度
      var itemX = item.offsetLeft; 
      var itemWidth = item.offsetWidth;
      // console.log("itemX = ",itemX);
      // console.log("itemWidth = ",itemWidth);
      // console.log('prePosition = ',prePosition);
      // console.log('this.peopleRightEdge = ',this.peopleRightEdge);
      // console.log('curPosition = ',curPosition);
      // console.log('this.peopleLeftEdge = ',this.peopleLeftEdge);
      
      
      // 判断是否需要跳
      var rightNeedJump = (prePosition + this.peopleRightEdge <= itemX) && (curPosition + this.peopleRightEdge > itemX);
      var leftNeedJump = (prePosition + this.peopleLeftEdge >= itemX + itemWidth - ans) && (curPosition + this.peopleLeftEdge < itemX + itemWidth - ans);
      
      // 如果需要跳跃
      if (rightNeedJump || leftNeedJump) {
        var needDownBlock = curPosition > itemX - this.peopleRightEdge && curPosition < itemX + itemWidth - this.peopleLeftEdge;
        // 判断是否会落在障碍物
        
        this.jump(item, needDownBlock);
      }

      // 判断是否是在障碍物上，然后需要从障碍物落下
      var rightNeedFall = (prePosition + this.peopleLeftEdge <= itemX + itemWidth - ans) && (curPosition + this.peopleLeftEdge > itemX + itemWidth - ans);
      var leftNeedFall = (prePosition + this.peopleRightEdge > itemX) && (curPosition + this.peopleRightEdge <= itemX);
      
      // 如果需要落下障碍物
      if (rightNeedFall || leftNeedFall) {
        
        this.drop(item);
      }
    }
  }
};