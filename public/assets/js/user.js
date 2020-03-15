
//声明一个数组
let userArr = [];

//发送请求
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        userArr = response;
        render();
    }
})
function render() {
    let html = template('usertpl',{userdata: userArr});
    $('tbody').html(html);
}