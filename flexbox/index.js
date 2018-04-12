console.log('%c既然按了F12，为何不去GitHub顺便给个start', 'color: #fff; background: #f40; font-size: 24px;');
console.log('%chttps://github.com/xluos/demo/tree/gh-pages/flexbox','font-size: 16px;');

const item_body = document.getElementById('item-body');
//设置容器属性的点击事件
document.getElementById('options').addEventListener('click', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    if (target.matches('label')) {
        let rid = document.getElementById(target.getAttribute('for'));
        // 如果没有选中触发的点击改为选中状态
        if(!rid.checked) rid.checked = 'checked';
        
        let val = target.innerText;
        let attributeName = rid.getAttribute('name');
        item_body.style[attributeName] = val;
      }
})
//添加和减少项目的点击事件
var count = 4;
const countNode = document.getElementById('count');

var item_template = `<div class="number">${count}</div><input title=“定义项目的排列顺序。数值越小，排列越靠前，默认为0” placeholder="order" type="text"><input title=“属性定义项目的放大比例，默认为0” placeholder="flex-grow" type="text"><input title=“属性定义了项目的缩小比例，默认为1” placeholder="flex-shrink" type="text"><input title=“属性定义了在分配多余空间之前，项目占据的主轴空间。” placeholder="flex-basis" type="text"><select name="align-self" title="align-self 允许不一样的对齐方式，可覆盖\`align-items\`属性" ><option value="flex-start">flex-start</option><option value="flex-end">flex-end</option><option value="center">center</option><option value="space-between">space-around</option><option value="stretch">stretch</option><option selected="selected" value="auto">auto</option></select>`
function addItem(){
    if(count >= 20){
        alert("不能再加了！再加挤爆了了");
        return ;
    }
    var node = document.createElement('div');
    node.setAttribute('class', 'item');
    node.style.width = rval + 'px';
    count++;
    node.innerHTML = item_template;
    node.getElementsByClassName('number')[0].innerText = count;
    item_body.appendChild(node);
    countNode.innerText = count;
}
function subItem(){
    if(count <= 1){
        alert("不能再删了！再删玩儿坏了");
        return ;
    }
    var rmitem = document.getElementsByClassName('item');
    // console.log(rmitem);
    item_body.removeChild(rmitem[rmitem.length-1]);
    count--;
    countNode.innerText = count;
}
//拖动更改项目宽度的事件
var rval = 85;
const widthRange = document.getElementById('widthRange');
const itemWidth = document.getElementById('itemWidth');
widthRange.addEventListener('input', setWidth);
// widthRange.addEventListener('click', setWidth);
function setWidth() {
    if(widthRange.value !== rval)
    { 
        rval = widthRange.value;
        itemWidth.innerText = widthRange.value;;
        let items = document.getElementsByClassName('item');
        
        for(let i = 0; i < items.length; i++)
        {
            items[i].style.width = rval + 'px';
        }
    }
}

// 项目属性设置绑定事件

document.getElementById('item-body').addEventListener('input', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    if (target.matches('input') || target.matches('select')) {
        target.parentNode.style[target.placeholder || target.name] = target.value;
    }
}
)