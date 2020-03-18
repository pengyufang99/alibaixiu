//发送请求，获取到文章分类信息
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res)
        let html = template('cateTpl', { data: res });
        $("#category").html(html);
    }
});

//图片上传
$('#feature').on('change', function () {
    //获取文件
    var file = this.files[0];
    //创建formData
    var formData = new FormData();
    //将文件追加到formData对象中
    formData.append('cover', file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            //图片预览
            $('.thumbnail').show().attr('src', res[0].cover)
            $('#hidden').val(res[0].cover)
        }
    })
});

//完成文章添加功能
$('#btnAdd').on('click', function () {
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: data,
        success: function (res) {
            location.href = '/admin/posts.html';
        }
    })
})


//封装函数，判断id值，是修改，还是添加
function getParams(key) {
    let params = location.search.substr(1).split('&');
    for (var i = 0; i < params.length; i++) {
        //key=value,将字符串转为数组
        let temp = params[i].split('=');
        if (temp[0] === key) {
            return temp[1]
        }
    }
    return -1;
}

//调用函数
let id = getParams('id');

if (id != -1) {
    $.ajax({
        url: '/posts/' + id,
        type: 'get',
        success: function (res) {
            console.log(res);

            $('h1').text('编辑文章');
            $('#title').val(res.title);
            $("#content").val(res.content);
            $(".thumbnail").show().attr('src', res.thumbnail);
            $("#created").val(res.createAt.substr(0, 16));

            $("#category option").each(function (index,item) {
                console.log($(item).attr('value'));
                if ($(item).attr('value') == res.category._id) {
                    $(item).prop('selected', true)
                }
            });


            $("#status option").each(function (index,item) {
                if ($(item).attr('value') == res.state) {
                    $(item).prop('selected', true)
                }
            });

            //隐藏保存
            $('#btnAdd').hide();
            //显示修改
            $("#btnEdit").show();
        }
    })
}


//保存修改
$('#btnEdit').on('click',function() {
    let data = $('form').serialize();
    $.ajax({
        type: 'put',
        url: '/posts/'+id,
        data: data,
        success: function() {
            location.href = 'posts.html';
        }
    })
})