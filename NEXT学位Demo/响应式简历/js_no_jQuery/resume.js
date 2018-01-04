var loading = document.getElementsByClassName('loading')[0];
var me = document.getElementsByClassName('me')[0];
var containerPage = document.getElementById('page');
var window_html = document.querySelector('html');
var images = [
    './image/hero_head_1_cat.png',
    './image/cloud.png',
    './image/mountain_1.png',
    './image/mountain_2.png',
    './image/tree.png',
    './image/ground.png',
    './image/Bee2.png',
    './image/Bee.png',
    './image/cat.png',
    './image/university1.jpg',
    './image/university2.jpg',
    './image/university3.jpg',
    './image/university4.jpg',
];

var Resume = {
    // 初始化函数
    init: function () {
        var self = this;
        // 初始化其他组件
        Me.init();
        // 加载资源
        resourceHelper.load(images, function(result) {
        // 去除loading
        loading.style.display = "none";
        // 绑定事件
        self.bindEvent();
      });
    },

    // 事件绑定

    bindEvent: function () {
        var curPosition = 0; // 当前位置
        var prePosition = 0; // 之前位置

        // 监听滚动事件
        window.addEventListener('scroll', function (e) {
            // 设置当前页面滚动位置
            curPosition = window_html.scrollTop;
            // console.log('window.scrollTop;',body.scrollTop);
            
            // console.log('curPosition',curPosition);
            
            // curPosition = $window.scrollTop();
            // 计算移动距离
            var distant = curPosition - prePosition;
            // console.log(distant);
            // 更新人物状态
            Me.setDirection(distant);
            // 背景移动
            Scense.move(curPosition);

            // 人物走
            Me.walk();
            // console.log('行走');

            // 更新 prePosition
            prePosition = curPosition;
        }, false);
        
        // 开始建立按钮
        var btnNode = document.getElementsByClassName('btn')[0]
        btnNode.addEventListener('click', function () {
            me.style.display = "none";
            var Height = Scense.computeWidth()
            containerPage.style.height = Height + 'px';
        });
        // 当修改浏览器窗口大小的时候，需要重新设置
        window.addEventListener('resize', function () {
            var Height = Scense.computeWidth()
            containerPage.style.height = Height + 'px';
        });
    }
};

// 初始化页面
Resume.init();