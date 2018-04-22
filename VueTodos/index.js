
// 子组件
var item = {
    props: ['itemdata'],
    template: 
            '<li class="todos-item">'
            +    '<div class="checkbox">'
            +        '<input type="checkbox" v-bind:id="\'item-\' + itemdata.id">'
            +        '<label v-bind:for="\'item-\' + itemdata.id" v-bind:class="{ complete: itemdata.ok, nocomplete: !itemdata.ok}" @click="reOk()"></label>'
            +    '</div>'
            +    '<div class="todos-item-text">'
            +        '<div class="text" @dblclick="itemdata.edit=!itemdata.edit" v-show="!itemdata.edit" v-bind:class="{ strickout: itemdata.ok}">{{itemdata.text}}</div>'
            +        '<input type="text" @blur="itemBlur" v-show="itemdata.edit" v-model.trim="itemdata.text">'
            +    '</div>'
            +    '<button class="shut" @click="remove">X</button>'
            +'</li>',
    methods: {
        // 设置为已完成
        reOk: function() {
            this.itemdata.ok = !this.itemdata.ok;
            this.$emit("updatasize",this.itemdata.ok?1:-1);
        },
        // 和父组件通信删除这个选项
        remove: function(){
            this.$emit("reitems",this.itemdata);
        },
        // 编辑框失去焦点后如果内容为空则删除
        itemBlur: function() {
            if(this.itemdata.text.length) {
                this.itemdata.edit=!this.itemdata.edit
            } else {
                this.remove();
            }
        }
    }
}

var app = new Vue({
    // 挂载对象
    el: '#app',
    // 数据对象
    data: {
        message: '',
        todos: [
            // {
            //     id: 0,          //id
            //     show: true,     //是否显示
            //     ok: false,      //是否已完成
            //     edit: false,    //当前是否可编辑
            //     text: "123456", //内容
            // },
        ],
        todoscomplete: 0,      //已完成数量
        activate: 'all'        //当前选择的页面全部选项all   已完成的completed     未完成的unfinished
    },
    // 计算属性
    computed: {
        // 剩余未完成的项目
        count: function () {
            return this.todos.length - this.todoscomplete;
        }
    },
    // 方法
    methods: {
        // 添加一条事项
        add: function (){
            if(this.message.length === 0) return;  //如果长度为空则不添加  空白符已用.trim修饰符去除
            this.todos.push({
                id: this.todos.length,
                show: true,
                ok: false,
                edit: false,
                text: this.message,
            })
            this.message = '';
        },
        // 删除传入的条目
        reitem: function(id) {
            let index = this.todos.indexOf(id);
            this.todos.splice(index,1);
        },
        // 全部选中
        allOk: function() {
            this.todos.forEach(element => {
                element.ok = true;
            });
            this.todoscomplete = this.todos.length;
        },
        // 更新已完成的数量  n子组件通过自定义事件传入
        updatasize: function(n) {
            this.todoscomplete += n;
        },
        //清除已完成的选项
        clearOk: function() {
            this.todos = this.todos.filter(element=>{
                return !element.ok;
            })
            this.todoscomplete = 0;
        },
        // 切换筛选页面
        // 全部页面，所有选项的show属性设为true
        allPage: function() {
            this.activate = 'all';
            this.todos.map(element=>element.show = true);
        },
        // 未完成页面，只有ok属性为false的选项的show属性设为true
        unfinishedPage: function() {
            this.activate = 'unfinished';
            this.todos.map(element=>element.show = !element.ok);
        },
        // 已完成的页面，ok属性为true的选项的show属性设为true
        completedPage: function() {
            this.activate = 'completed';
            this.todos.map(element=>element.show = element.ok);
        }
    },
    // 注册局部组件
    components: {
        'todos-item': item,
    }
})