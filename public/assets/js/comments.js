var comArr = [];
//发送ajax获取到所有的评论
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        console.log(res);
    }
})