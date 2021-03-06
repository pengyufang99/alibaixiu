
//声明一个数组
let userArr = [];

//发送请求
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        userArr = response;
        render();
    }
})
function render() {
    let html = template('usertpl', { userdata: userArr });
    $('tbody').html(html);
}
//完成用户添加的时候写入
//ajax实现用户添加功能
$('#avatar').on('change', function () {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //通过jq的ajax上传文件就要设置下面两个属性
        processData: false,
        contentType: false,
        success: function (res) {
            $('#preImg').attr('src', res[0].avatar);
            //还要将图片的地址保存在表单的控件属性中
            $('#hidden').val(res[0].avatar)
        }
    })
})

//完成用户添加功能
$("#btnAdd").on('click', function () {
    //获取所有表单控件的内容
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: data,
        success: function (res) {
            userArr.push(res);
            render();

            //将表单数据清空
            $('input[type="email"]').val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').val('');
            $('#status0').prop('checked', false);
            $('#status1').prop('checked', false);
            $('#admin').prop('checked', false);
            $('#normal').prop('checked', false);
            $('#hidden').val('');
            $('#preImg').attr('src', '../assets/img/default.png')
        },
        error: function () {
            console.log(err)
        }
    })
})

//给编辑按钮添加点击事件
var userId;
$('tbody').on('click', '.edit', function () {
    userId = $(this).attr('data-id');
    // console.log(userId);
    $('h2').text('编辑用户');
    //获取当前被点击的这个元素的父级元素 tr
    let tr = $(this).parents('tr');
    $('#preImg').attr('src', tr.find('img').attr('src'));
    $('#hidden').val(tr.find('img').attr('src'));
    //显示编辑框数据
    $('input[name="email"]').val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    if (tr.children().eq(4).text() == '未激活') {
        $('#status0').prop('checked', true);
    } else {
        $('#status1').prop('checked', true);
    }

    if (tr.children().eq(5).text() == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }

    //切换编辑和添加按钮
    $('#btnAdd').hide();
    $('#btnEdit').show();

})

//完成修改提交编辑的功能
$('#btnEdit').on('click', function () {
    //收集到表单数据信息
    let data = $('form').serialize();
    $.ajax({
        type: 'PUT',
        url: '/users/' + userId,
        data: data,
        success: function (res) {
            //更新数组
            let index = userArr.findIndex(item => res._id = item._id);
            userArr[index] = res;
            //重新渲染
            render();
            //恢复成之前添加表单的样式
            // 只我们编辑完成了 之前的那个表单要变成添加用户的表单 
            $('h2').text('添加新用户');

            $('#preImg').attr("src", '../assets/img/default.png');
            $('#hidden').val('');
            // 表示将这个输入框 设置为启用
            $('input[name="email"]').prop('disabled', false).val('');
            $('input[name="nickName"]').val('');
            // 表示将这个输入框 设置为启用
            $('input[name="password"]').prop('disabled', false);

            $('#status0').prop('checked', false)
            $('#status1').prop('checked', false)
            $('#admin').prop('checked', false)
            $('#normal').prop('checked', false)

            $('#btnAdd').show();
            $('#btnEdit').hide();

        },
        error: function (err) {
            console.log(err);
        }
    })
})

//删除单个用户
$('tbody').on('click', '.del', function () {
    //获取当前id
    let id = $(this).attr('data-id');
    //确认删除
    if (confirm('您真的要删除这个用户吗')) {
        //发送ajax
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                //从数组中找出该元素
                let index = userArr.findIndex(item => item._id === res._id);
                userArr.splice(index, 1);
                render();
            }
        })
    }
})

//批量删除功能实现
//1.全选功能
$('thead input').on('click', function () {
    $('tbody input').prop('checked', $(this).prop('checked'));
    if($(this).prop('checked')){
        $('.delAll').show();
    }else {
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
        arr.push($(item).parents('tr').attr("data-id"));
    })

    if (confirm("你真的要删除吗?")) {
        // 需要批量删除的用户的id已经放置于 arr这个数组中了 接下来就是发送ajax了 
        $.ajax({
            type: 'delete',
            url: `/users/` + arr.join('-'),
            success: function (res) {
                // 因为批量删除它返回是一个数组  实现无刷新删除的功能 
                res.forEach(item => {
                    // 这个item就表示数组里面的每一个项就是一个对象  我们可以从userArr把对象的用户的id找出来 将其删除 然后再 render()一下 
                    let index = userArr.findIndex(ele => ele._id === item._id);
                    userArr.splice(index, 1);
                    render();
                })
            }
        })
    }
})

