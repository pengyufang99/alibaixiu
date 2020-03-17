$('#modifyForm').on('click', '.btn-primary', function () {

    // //获取输入框的值
    var userPass = $('[name="userPass"]').val().trim();
    var newPass = $('[name="newPass"]').val().trim();
    var confirmPass = $('[name="confirmPass"]').val().trim();
    if (userPass.length === 0) return alert("请输入密码");
    if (newPass.length === 0) return alert("请输入新密码");
    if (confirmPass.length === 0) return alert("请输入确认密码");
    if (newPass != confirmPass) return alert('两次输入不一致');

    $.ajax({
        type: "PUT",
        url: "/users/password",
        data: {
            userPass: userPass,
            newPass: newPass,
            confirmPass: confirmPass
        },
        success: function(res) {
            location.href = '/admin/login.html';
        }
    })
})