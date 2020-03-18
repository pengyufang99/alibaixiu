//发送ajax 请求文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    data: {
        page: 1
    },
    success: function(res) {
        let html = template('pTpl',{data:res.records});
        $('tbody').html(html);
    }
})