var $scenseHorizontal = document.getElementsByClassName('BackGround')[0];
var $cloud = $scenseHorizontal.getElementsByClassName('cloud')[0];
var $mountain1 = $scenseHorizontal.getElementsByClassName('mountain1')[0];
var $mountain2 = $scenseHorizontal.getElementsByClassName('mountain2')[0];
/**
 * 场景对象 Scense
 */
var Scense = {

  computeWidth: function() {
    console.log('$scenseHorizontal.scrollWidth',$scenseHorizontal.scrollWidth);
    
    return $scenseHorizontal.scrollWidth - document.getElementsByClassName('content')[0].clientWidth;
  },
  /**
   * 背景移动层次感
   */
  move: function(currPos) {
    // console.log(currPos);
    
    // 整体场景向左移动
    $scenseHorizontal.style.left = -currPos + 'px';

    // 前面的山0.75  后面的山 0.8-300
    $mountain1.style.left = currPos * 0.75 + 'px';

    $mountain2.style.left = currPos * 0.8 + 300 + 'px';

    // // 云更远，因此只移动 1 - 0.95 = 0.05
    $cloud.style.left = currPos * 0.95 + 'px';
    
  },
};

