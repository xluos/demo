var item = {
    props: ['itemdata'],
    template: 
            '<li class="todos-item">'
            +    '<div class="checkbox">'
            +        '<input type="checkbox" v-bind:id="\'item-\' + itemdata.id">'
            +        '<label v-bind:for="\'item-\' + itemdata.id" v-bind:class="{ complete: itemdata.ok, nocomplete: !itemdata.ok}" @click="reOk()"></label>'
            +    '</div>'
            +    '<div class="todos-item-text">'
            +        '<div class="text" v-show="!itemdata.edit" v-bind:class="{ strickout: itemdata.ok}">{{itemdata.text}}</div>'
            +        '<input type="text" v-show="itemdata.edit" v-model="itemdata.text">'
            +    '</div>'
            +    '<button class="shut" @click="remove">X</button>'
            +'</li>',
    methods: {
        reOk: function() {
            this.itemdata.ok = !this.itemdata.ok;
        },
        remove: function(){
            console.log(this);
            this.$emit("reitems",this.itemdata.id);
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
            {
                id: 0,
                ok: false,
                edit: false,
                text: "123456",
            },
        ],
    },
    // 计算属性
    computed: {
        count: function () {
            return this.todos.length;
        }
    },
    // 过滤器
    filters: {

    },
    // 方法
    methods: {
        add: function (){
            if(this.message.length === 0) return;
            this.todos.push({
                id: this.todos.length,
                ok: false,
                edit: false,
                text: this.message,
            })
            // this.message = '';
        },
        reitem: function(index) {
            console.log("aa",index);
            
            this.todos.splice(index,1);
        }
    },
    // 监听器
    watch: {

    },
    // 注册局部组件
    components: {
        'todos-item': item,
    }
})