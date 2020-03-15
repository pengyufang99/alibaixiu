
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