/*----------用户模块的功能----------*/

// 新增用户模块
// 当表发发生提交时出发该事件
$("#userForm").on("submit", function() {
    // 获取表单的数据
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function() {
            // 如果新增成功，刷新页面
            location.reload();
        },
        error: function() {
            alert("用户添加失败");
        }
    });

    // 防止表单的默认提交行为
    return false;
});

// 选择头像功能
$('#modifyBox').on('change', '#avatar', function() {
    // 创建formData对象
    var formData = new FormData();

    // 参数1：key
    // 参数2：value
    // this.files[0]：用户选择到的文件
    formData.append("avatar", this.files[0]);
    // 发送请求
    $.ajax({
        type: "post",
        url: "/upload",
        processData: false, // 让$.ajax不要解析请求参数为user=xx&pwd=123这种形式
        contentType: false, // 让$.ajax不要设置请求参数的类型，因为FormData对象中已经设置好了
        data: formData,
        success: function(response) {
            // 将img中的src属性值修改为服务器的地址
            console.log(response[0].avatar);
            $("#preview").attr("src", response[0].avatar);
            // 把图片显示在页面中
            $("#hiddenAvatar").val(response[0].avatar);
        }
    });
});

// 访问首页显示所有用户信息
$.ajax({
    type: "get",
    url: "/users",
    success: function(response) {
        // 关联模板引擎
        const html = template("userTpl", {
            data: response
        });
        // 获取tbody
        $("#userBox").html(html);
    }
});

// 点击编辑按钮
$("#userBox").on("click", ".edit", function() {
    // 获取点击这条数据的id
    var id = $(this).attr("data-id");
    // 根据id获取用户的信息
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            // 关联模板
            const html = template("modifyTpl", response);
            // 渲染到页面
            $("#modifyBox").html(html);
        }
    });
});

// 修改用户信息
$("#modifyBox").on("submit", "#modifyForm", function() {
    // 获取表单的值
    var formData = $(this).serialize();
    // 获取id
    var id = $(this).attr("data-id");

    // 发送请求
    $.ajax({
        type: "PUT",
        url: "/users/" + id,
        data: formData,
        success: function(response) {
            location.reload();
        }
    });

    // 防止表单的默认提交行为
    return false;
});

// 点击删除按钮
$("#userBox").on("click", ".delete", function() {
    // 判断用户是否真的要删除数据
    if (confirm("您真的要删除这条数据吗？")) {
        // 获取id
        var id = $(this).attr("data-id");
        // 发出请求
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function() {
                // 如果删除成功，刷新页面
                location.reload();
            }
        });
    }
});

// ***全选按钮功能***
// 获取全选按钮
var selectAll = $("#selectAll");
// 获取批量删除按钮
var dedleteMany = $("#deleteMany");
// 当全选按钮状态发生改变时
selectAll.on("change", function() {
    // 获取当前的选中状态
    // 选中复选框为true，没选中为false
    var status = $(this).prop("checked");
    // 判断是否显示批量删除按钮
    if (status) {
        // 当全选按钮为true时，显示批量删除按钮
        dedleteMany.show();
    } else {
        // 当全选按钮为false时，隐藏批量删除按钮
        dedleteMany.hide();
    }

    // 获取所有的用户选择框,将选择框的值修改为当前的状态
    $("#userBox").find("input").prop("checked", status);
});
// 当用户列表的选择框状态发生改变时
$("#userBox").on("change", ".userStatus", function() {
    // 用户列表中有一个没被选中，全选按钮就不会被选中
    // 用户列表全部选中，全选按钮会被选中
    // 获取用户列表中所有的选择框
    var inputs = $("#userBox").find("input");
    // 判断被选中的数量是否与所有的数量相等
    if (inputs.length == inputs.filter(":checked").length) {
        // 相等，说明全部被选中
        // 全选按钮也要被选中
        selectAll.prop("checked", true);
    } else {
        // 不相等，全选按钮不能被选中
        selectAll.prop("checked", false);
    }

    // 判断是否显示批量删除按钮
    if (inputs.filter(":checked").length > 0) {
        // 当用户列表的选择框为true的数量大于0时，显示批量删除按钮
        dedleteMany.show();
    } else {
        // 否则隐藏批量删除按钮
        dedleteMany.hide();
    }
});

// ***批量删除功能***
$("#deleteMany").on("click", function() {
    // 专门用来存放要删除数据id的数组
    var ids = [];
    // 获取所有被选中的元素
    var checkUser = $("#userBox").find("input").filter(":checked");
    // 将所有被选中的元素存入数组
    checkUser.each(function(index, element) {
        // 因为element是原生的html对象,要转换成jquery对象
        ids.push($(element).attr("data-id"));
    });

    // 发送请求
    if (confirm("您确定要删除吗？")) {
        $.ajax({
            type: "delete",
            // 根据接口文档， id用 - 分隔， 所以使用join()
            url: "/users/" + ids.join("-"),
            success: function() {
                location.reload();
            }
        });
    }
});




//