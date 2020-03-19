$('#logo').on('change', function () {
    //创建二进制对象，实现文件上传
    let formData = new FormData();
    formData.append('img', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res);
            $('img').attr('src', res[0].img);
            $('#hidden').val(res[0].img);
        }
    })
})

$('#btnAdd').on('click',function() {

    //将多选框状态的值赋值给隐藏域
    $('#comment').val($('#comment_status').prop('checked'));
    $('#review').val($('#comment_reviewed').prop('checked'));
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: data,
        success: function(res) {
            location.reload();
        }
    })
})