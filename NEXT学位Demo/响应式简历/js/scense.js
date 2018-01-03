var $scenseHorizontal = $('.BackGround');
var $cloud = $scenseHorizontal.find('.cloud');
var $mountain1 = $scenseHorizontal.find('.mountain1');
var $mountain2 = $scenseHorizontal.find('.mountain2');
/**
 * 场景对象 Scense
 */
var Scense = {
  computeWidth: function() {
    return $scenseHorizontal.width() - $('.content').width();;
  },
  /**
   * 背景移动层次感
   */
  move: function(currPos) {
    // 整体场景向左移动
    $scenseHorizontal.css({
      left: -currPos
    });
    // 山比较远，因此只移动 1 - 0.75 = 0.25
    $mountain1.css({
      left: currPos * 0.75
    });
    $mountain2.css({
        left: currPos * 0.8 - 300

      });
    // // 云更远，因此只移动 1 - 0.95 = 0.05
    $cloud.css({
      left: currPos * 0.95
    });
    
  },
};