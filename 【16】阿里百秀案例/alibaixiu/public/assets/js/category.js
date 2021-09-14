// 添加分类
$("#addCategory").on("submit", function() {
    // 获取表单的内容
    var formData = $(this).serialize();
    console.log(formData);
    // 发送请求
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function() {
            // 添加成功，刷新页面
            location.reload();
        }
    });
    // 阻止表单默认提交
    return false;
});

// 列表展示
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // 关联模板
        var html = template("categoryListTpl", {
            data: response
        });
        // 渲染到页面
        $("#categoryBox").html(html);
    }
});

// 点击编辑按钮
$("#categoryBox").on("click", ".edit", function() {
    // 获取id
    var id = $(this).attr("data-id");
    // 发送请求
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response) {
            // 关联模板
            var html = template("modifyCategoryTpl", response);
            // 获取父类元素
            $("#formBox").html(html);
        }
    });
});
// 修改分类
$("#formBox").on("submit", "#modifyCategory", function() {
    // 获取表单的数据
    var formData = $(this).serialize();
    // 获取点击的id
    var id = $(this).attr("data-id");

    // 发送请求
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function() {
            // 修改完成后，刷新页面
            location.reload();
        }
    });

    // 阻止表单的默认提交行为
    return false;
});

// 删除分类
$("#categoryBox").on("click", ".delete", function() {
    // 获取id
    var id = $(this).attr("data-id");
    // 发送请求
    $.ajax({
        type: "delete",
        url: "/categories/" + id,
        success: function() {
            // 刷新页面
            location.reload();
        }
    });
});