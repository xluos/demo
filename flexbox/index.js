const item_body = document.getElementById('item-body');

document.getElementById('options').addEventListener('click', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    if (target.matches('label')) {
        let rid = target.getAttribute('for');
        let val = target.innerText;
        // console.log(rid);
        // console.log(val);
        let attributeName = document.getElementById(rid).getAttribute('name');
        // item_body.setAttribute('style', `${attributeName}: ${val}`);
        console.log(attributeName + ':' + val);
        item_body.style[attributeName] = val;
      }
})
var count = 4;
const countNode = document.getElementById('count');

function addItem(){
    if(count >= 20){
        alert("不能再加了！再加挤爆了了");
        return ;
    }
    var node = document.createElement('div');
    node.setAttribute('class', 'item');
    count++;
    node.innerText = count;
    item_body.appendChild(node);
    countNode.innerText = count;
}
function subItem(){
    if(count <= 0){
        alert("不能再删了！再删玩儿坏了");
        return ;
    }
    var rmitem = document.getElementsByClassName('item');
    console.log(rmitem);
    item_body.removeChild(rmitem[rmitem.length-1]);
    count--;
    countNode.innerText = count;
}