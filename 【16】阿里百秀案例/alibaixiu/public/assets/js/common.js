/*----------公共使用的功能----------*/

// 退出功能
$("#logout").on("click", function() {
    // 点击退出后，弹出提示框
    // confirm():弹出提示框,并显示内容,返回值为true,确定退出,否则为取消退出
    var isConfirm = confirm("您确定退出吗?");
    if (isConfirm) {
        // 如果为true,则是选的确认退出
        $.ajax({
            type: "post",
            url: "/logout",
            success: function() {
                // 如果退出成功，则返回登录页面
                location.href = "login.html";
            },
            error: function() {
                alert("退出失败");
            }
        });
    }
});