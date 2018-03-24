var btn = document.getElementById('showModel');
var cancel = document.getElementById('cancel');
var modal = document.getElementById('modal');
var sure = document.getElementById('sure');
var modal_content = document.getElementById('modal-content');
btn.addEventListener('click', function(){
    modal.style.display = "block";
});
modal.addEventListener('click', function(event){
    if(event.target === this){
        modal.style.display = "none";
    }
});
cancel.addEventListener('click', function(){
    modal.style.display = "none";
});
sure.addEventListener('click', function(){
    var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    var emailId = $("#email").val();
    if(regex.test(emailId))
    {
        var obj = new Object();
        obj.email = $("#email").val();
        $.ajax({
            //几个参数需要注意一下
            type: "GET",//方法类型
            dataType: "HTML",//预期服务器返回的数据类型
            url: "/submit",//url
            data: obj,
            success: function (result, resultCode) {
                console.log(result);
                alert(result);
                modal.style.display = "none";
            },
            error: function () {
                alert("异常！");
            }
        });
    }
    else
    {
        alert("邮箱地址不合法！");
    }
    
});
