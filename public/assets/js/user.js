
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
        error: function() {
            console.log(err)
        }
    })
})