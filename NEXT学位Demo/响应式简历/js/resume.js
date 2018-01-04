var $window = $(window);
var loading = $('.loading');
var me = $('.me');
var containerPage = $('#page');

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
    'http://photocdn.sohu.com/20090422/Img263555552.jpg',
    'http://img.mp.itc.cn/upload/20160608/85baa9de898249a49dd4a59b5a233334_th.jpg',
    'https://jiuye-res.jikexueyuan.com/zhiye/showcase/attach-b2be786c-0fe2-44a9-9dc5-e3cdb7ce06a9.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515066093478&di=316d92d087f2fe9f88227e8b8738d5db&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D4724b248b919ebc4d4757edaea4fa589%2Fb64543a98226cffc2002329fb3014a90f603eaf7.jpg',
];

var Resume = {
    // 初始化函数
    init: function () {
        var self = this;
        // 初始化其他组件
        Me.init();
        // 页面滚动到最开始
        $('window').scrollTop(0);
        // 加载资源
        resourceHelper.load(images, function(result) {
        // 去除loading
        loading.fadeOut();
        // 绑定事件
        self.bindEvent();
      });
    },

    // 事件绑定

    bindEvent: function () {
        var curPosition = 0; // 当前位置
        var prePosition = 0; // 之前位置

        // 监听滚动事件
        $window.on('scroll', function (e) {
            // 设置当前页面滚动位置
            curPosition = $window.scrollTop();
            // 计算移动距离
            var distant = curPosition - prePosition;
            // console.log(distant);
            // 更新人物状态
            Me.setDirection(distant);
            // 背景移动
            Scense.move(curPosition);


            // 判断是否跳跃
            Me.checkJump(curPosition, prePosition);
            // console.log("跳跃");
            // 人物走
            Me.walk();
            // console.log('行走');

            // 更新 prePosition
            prePosition = curPosition;
        });

        // 开始建立按钮
        $window.on('click', '.btn', function () {
            me.hide();
            containerPage.css({
                height: Scense.computeWidth()
            });
        });
        // 当修改浏览器窗口大小的时候，需要重新设置
        $window.on('resize', function () {
            containerPage.css({
                height: Scense.computeWidth()
            });
        });
    }
};

// 初始化页面
Resume.init();