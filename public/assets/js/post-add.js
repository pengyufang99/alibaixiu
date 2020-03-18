//发送请求，获取到文章分类信息
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        // console.log(res)
        let html = template('cateTpl',{data:res});
        $("#category").html(html);
    }
});

//图片上传
$('#feature').on('change',function() {
    //获取文件
    var file = this.files[0];
    //创建formData
    var formData = new FormData();
    //将文件追加到formData对象中
    formData.append('cover',file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            //图片预览
            $('.thumbnail').show().attr('src',res[0].cover)
            $('#hidden').val(res[0].cover)
        }
    })
});

//完成文章添加功能
$('#btnAdd').on('click',function() {
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: data,
        success: function(res) {
            location.href = '/admin/posts.html';
        }
    })
})