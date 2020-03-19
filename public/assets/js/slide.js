
var slideArr = [];
//获取轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        console.log(res);
        slideArr = res;
        render();
    }
})


function render() {
    let html = template('sTpl', { data: slideArr });
    $('tbody').html(html);
}

//图片上传
$('#image').on('change', function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('img', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);
            $('.thumbnail').show().attr('src', res[0].img)
            $('#hidden').val(res[0].img);
        }
    })
})

//添加轮播图
$('.btn-add').on('click', function () {
    let data = $('form').serialize();
    console.log(data);
    $.ajax({
        type: 'post',
        url: '/slides',
        data: data,
        success: function (res) {
            console.log(res);
            slideArr.push(res);
            render();

             // 把对应的数据清空
          $('.thumbnail').hide().attr('src','');
          $('#image').val('');
          $('#hidden').val('');
          $('input[name="title"]').val('');
          $('input[name="link"]').val('');
        }
    })
});


//删除轮播图
$('tbody').on('click','.del',function() {
    let id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type: 'delete',
        url: '/slides/'+id,
        success: function(res) {
            let index = slideArr.findIndex(item=>item._id==res._id);
            slideArr.splice(index,1);
            render();
        }

    })
})
