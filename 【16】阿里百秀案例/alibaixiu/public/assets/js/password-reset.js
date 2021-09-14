// 修改密码
$("#modifyForm").on("submit", function() {
    // 获取表单数据
    var formData = $(this).serialize();
    // 发送请求
    $.ajax({
        // put不能大写
        type: "put",
        url: "/users/password",
        data: formData,
        success: function() {
            // 如果修改成功跳转到登录页面
            location.href = "/admin/login.html";
        }
    });

    // 阻止表单默认提交的行为
    return false;
});