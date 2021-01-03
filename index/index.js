// ======================================================防贼
if (localStorage.getItem('token') == null) {
    alert('嘿！我预判了你的预判');
    location.href = '../login.html';
}
// ======================================================后台获取用户信息
$.ajax({
    url: 'http://ajax.frontend.itheima.net/my/userinfo',
    headers: {
        Authorization: localStorage.getItem('token'),
    },
    success: function (res) {
        if (res.status == 0) {
            // 名字：如果有昵称就显示昵称，若没有显示用户名；
            var name = res.data.nickname || res.data.username;
            $('.username').html(name);
            //头像 如果有头像就显示头像
            if (res.data.user_pic != null) {
                $('.layui-nav-img').show().attr('src', res.data.user_pic);
                $('.avatar').hide();
            }
            //  //       如果没有，截取名字第一个字符，大写！显示在avatar盒子内
            else {
                //如果是英文名字 第一个字母大写
                var first = name.substr(0, 1).toUpperCase();
                $('.layui-nav-img').hide();
                $('.avatar').show().html(first).css('display', 'inline-block');
            }
        }
    },
    // 发出请求，接受后台返回数据，无论成功失败！
    complete: function (xhr) {
        var obj = xhr.responseJSON;
        if (obj.status == 1) {
            alert('因长期未操作，故退出账号')
            //把存在本地存储的token清除掉
            localStorage.removeItem('token');
            //转到登录页面
            location.href = '../login.html';
        }
    }
});

//// ====================================================退出账号
var layer = layui.layer;
$('#logout').on('click', function () {
    //layer的弹窗
    //确定退出执行回调函数，
    layer.confirm('确定退出该账号吗', function (index) {
        //把存在本地存储的token清除掉
        localStorage.removeItem('token');
        //转到登录页面
        location.href = '../login.html';
        //可有可无，关闭弹窗.因为已经跳转页面了
        layer.close(index);
    })
});
//