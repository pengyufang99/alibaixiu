//退出登录
$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出吗');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html'
            },
            error: function () {
                alert('失败');
            }
        })
    }
})

$.ajax({
    type: 'get',
    url: '/users/'+userId,
    success: function(res) {
        console.log(res);
        $('.profile img').attr('src',res.avatar);
        $('.profile h3').text(res.nickName);
    }
})
