var cateArr = [];
//拿到所有数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (res) {
        cateArr = res;
        render();
    }
});
//渲染数据
function render() {
    let html = template('cTpl', { cdata: cateArr });
    $('tbody').html(html);
}
//添加功能
$('.btn-primary').on('click', function () {
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: data,
        success: function (res) {
            console.log(res);
            cateArr.push(res);
            render();

            //清空
            $('[name="title"]').val('');
            $('[name="className"]').val('');
        }
    })
});

//编辑功能
var id;
$('tbody').on('click', '.edit', function () {
    id = $(this).parents().attr('data-id');
    $('h2').text('编辑分类');
    let tr = $(this).parents('tr');
    $('[name="title"]').val(tr.children().eq(1).text());
    $('[name="className"]').val(tr.children().eq(2).text());
    $('#btnAdd').hide();
    $('#btnEdit').show();
});

//提交修改的编辑功能，先获取到对应的id值
$('#btnEdit').on('click', function () {
    var data = $('form').serialize();
    //发送ajax
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: data,
        success: function (res) {
            let index = cateArr.findIndex(item => item._id == res._id);
            cateArr[index] = res;
            render();
            //还原
            $('h2').text('添加分类');
            $('[name="title"]').val('');
            $('[name="className"]').val('');
            $('#btnAdd').show();
            $('#btnEdit').hide();
        }
    })
});
//删除功能
$('tbody').on('click', '.del', function () {
    let id = $(this).parents().attr('data-id');
    if (confirm("确定删除吗？")) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                let index = cateArr.findIndex(item => item._id == res._id);
                cateArr.splice(index, 1);
                render();
            }
        })
    }
});

//批量删除功能实现
//1.全选功能
$('thead input').on('click', function () {
    $('tbody input').prop('checked', $(this).prop('checked'));
    if ($(this).prop('checked')) {
        $('.delAll').show();
    } else {
        $('.delAll').hide();
    }
})
//2.如果下面都打勾了,上面也要选中
$('tbody').on('click', '.check', function () {
    let length = $('.check').length;
    let checkedLength = $('.check:checked').length;
    // console.log(length);
    // console.log(checkedLength);
    $('thead input').prop('checked', length === checkedLength);

    //如果下面的复选框选中个数大于1，就将批量删除按钮显示
    if (checkedLength > 1) {
        $('.delAll').show();
    } else {
        $('.delAll').hide();
    }
});

// 给批量删除的按钮 添加点击事件  
$('.delAll').on('click', function () {

    let arr = [];

    // 我们需要获取被选中的元素  拿到id的值 但是id的值 在  需要遍历选中的元素  在jQuery中学习的each方法  
    $('.check:checked').each(function (index, item) {
        // 获取被选中元素的Id 把它push到这个数组中 
        // console.log()
        arr.push($(this).parents('tr').children().eq(3).attr('data-id'));
    })

    if (confirm("你真的要删除吗?")) {
        // 需要批量删除的用户的id已经放置于 arr这个数组中了 接下来就是发送ajax了 
        $.ajax({
            type: 'delete',
            url: `/categories/` + arr.join('-'),
            success: function (res) {
                // 因为批量删除它返回是一个数组  实现无刷新删除的功能 
                res.forEach(item => {
                    // 这个item就表示数组里面的每一个项就是一个对象  我们可以从userArr把对象的用户的id找出来 将其删除 然后再 render()一下 
                    let index = cateArr.findIndex(ele => ele._id === item._id);
                    cateArr.splice(index, 1);
                    render();
                })
            }
        })
    }
})