// 显示所有文章
$.ajax({
    type: "get",
    url: "/posts",
    success: function(response) {
        // 关联模板
        var html = template("postsTpl", response);
        // 渲染到页面
        $("#postsBox").html(html);
        // 关联模板
        var page = template("pageTpl", response);
        // 渲染
        $("#page").html(page);
    }
});

// 处理模板时间格式
function formatDate(date) {
    // 因为形参date是字符串类型,所以要先将date转换成Date类型
    date = new Date(date);
    // 处理格式
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

// 跳转到点击的页面
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function(response) {
            // 关联模板
            var html = template("postsTpl", response);
            // 渲染到页面
            $("#postsBox").html(html);
            // 关联模板
            var page = template("pageTpl", response);
            // 渲染
            $("#page").html(page);
        }
    });
}

// 向服务器发送请求，查询所有分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // 关联模板
        var html = template("categoryTpl", {
            data: response
        });
        // 渲染到页面
        $("#categoryBox").html(html);

    }
});

// 文章列表筛选
$("#filterForm").on("submit", function() {
    // 获取信息
    var formData = $(this).serialize();
    // 发送请求
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response) {
            // 关联模板
            var html = template("postsTpl", response);
            // 渲染到页面
            $("#postsBox").html(html);
            // 关联模板
            var page = template("pageTpl", response);
            // 渲染
            $("#page").html(page);
        }
    });

    // 阻止表单默认提交行为
    return false;
});