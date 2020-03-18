//获取分类和状态
var cid = $('#category').val();
var state = $('#state').val();
//发送ajax 请求文章列表
render(cid, state)



function changePage(index) {
    render(cid, state, index)
}

//获取所有的文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        let html = template('cTpl', { data: res });
        $('#category').append(html);
    }
});

//筛选功能
$('#search').on('click', function () {
    cid = $('#category').val();
    state = $('#state').val();
    //发送ajax
    render(cid, state);
})

//封装render函数
function render(cid, state, page = 1) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page,
            category: cid,
            state: state
        },
        success: function (res) {
            let html = template('pTpl', { data: res.records });
            $('tbody').html(html);

            let pageHtml = template('pageTpl', res);
            // console.log(pageHtml)
            $('.pagination').html(pageHtml);
        }
    })
}