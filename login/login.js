var form = layui.form,
    layer = layui.layer;
//login去注册
$('#goto-register').on('click', function () {
    $('#login').hide();
    $('#register').show();
});
//login去登录
$('#goto-login').on('click', function () {
    $('#login').show();
    $('#register').hide();
});

//自定义验证规则
form.verify({
    //对密码长度：非空 \S  要求6,12
    length: [/^\S{6,12}$/, "输入的密码不符合要求！"],
    //判断两次密码是否一致
    same: function (value) {
        if ($('#password').val() != value) {
            return '两次输入的密码不一致';
        }
    }
})
//注册账号功能
$('#register form').on('submit', function (e) {
    //阻止默认
    e.preventDefault();
    //获取收集数据
    var params = $(this).serialize();
    //提交数据
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/reguser',
        type: 'post',
        data: params,
        success: function (res) {
            //不管成功或者失败 都提醒后台返回的信息
            layer.msg(res.message);
            //判断 如果注册成功，
            if (res.status == 0) {
                //登录盒子显示，注册盒子隐藏
                $('#login').show();
                $('#register').hide();
            }
            //否则，
            else {
                //将用户名清空 
                $('#username').val('');
            }
        }
    })
});
//===========================================================登录
$('#login form').on('submit', function (e) {
    //阻止默认
    e.preventDefault();
    //获取收集数据
    var params = $(this).serialize();
    //提交数据
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        type: 'post',
        data: params,
        success: function (res) {
            //不管成功或者失败 都提醒后台返回的信息
            layer.msg(res.message);
            //成功了
            if (res.status == 0) {
                //把token提交到本地
                localStorage.setItem('token', res.token);
                //跳转到主页
                location.href = '../index.html';
            }
        }
    })
});