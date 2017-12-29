var $window = $(window);
var loading = $('.loading');
var intro = $('.intro');
var containerPage = $('.page');

var images = [];

var Resume = {
    // 初始化函数
    init: function () {
        // 初始化其他组件

        // 页面滚动到最开始
        $window.scrollTop(0);
        // 去除loading
        loading.fadeOut();
        // 绑定事件
        this.bindEvent();
    },

    // 事件绑定

    bindEvent: function () {
        var self = this;
        var curPosition = 0; // 当前位置
        var prePosition = 0; // 之前位置

        // 监听滚动事件
        $window.on('scroll', function (e) {
            // 设置当前页面滚动位置
            curPosition = $window.scrollTop();
            // 计算移动距离
            var distant = curPosition - prePosition;
            console.log(distant);
            // 更新人物状态
            // Me.setDirection(distant);
            // 背景移动
            Scense.move(curPosition);
            // 人物走
            // Me.walk();

            // 更新 prePosition
            prePosition = curPosition;
        });

        // 开始建立按钮
        $window.on('click', '.js-start-resume', function () {
            intro.hide();
            containerPage.css({
                height: Scense.computeWidth()
            });
        });
    }
};

// 初始化页面
Resume.init();