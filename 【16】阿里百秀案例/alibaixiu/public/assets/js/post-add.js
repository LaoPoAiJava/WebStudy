// 当访问写文章的页面时，所属分类就要加载完成
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // 关联模板
        var html = template("categoryTpl", {
            data: response
        });
        $("#category").html(html);
    }
});

// 上传文件
$("#feature").on("change", function() {
    // this是html原生的input对象
    var file = this.files[0];
    // 常见FormData对象,实现二进制文件上传
    var formData = new FormData();
    // 添加元素到formData
    formData.append("cover", file);
    // 发送请求
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 因为FormData对象中已经设置了这两个值，所以现在设置成false
        processData: false,
        contentType: false,
        success: function(response) {
            $("#thumbnail").val(response[0].cover);
        }
    });
});

// 写文章表单提交
$("#addForm").on("submit", function() {
    // 获取表单数据
    var formData = $(this).serialize();
    // 发送请求
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function(response) {
            // 添加完成跳转到文章列表页面
            location.href = "/admin/posts.html";
            // console.log(response);
        }
    });

    // 防止表单默认提交
    return false;
});

// 根据id的值判断是新增文章还是修改文章
// var id = getUrlParams("id");
// console.log(id);
// if (id != -1) {
//     console.log("不是-1");
//     // 如果id的值为-1，则是新增，如果不为-1，则是修改
//     // 根据id获取对应的文章
//     $.ajax({
//         type: "get",
//         url: "/posts/" + id,
//         success: function(response) {
//             // 当访问写文章的页面时，所属分类就要加载完成
//             $.ajax({
//                 type: "get",
//                 url: "/categories",
//                 success: function(categories) {
//                     response.categories = categories;
//                     var html = template("modifyTpl", response);
//                     $("#parentBox").html(html);
//                 }
//             });
//         }
//     });
// }

// 从浏览器的地址栏获得参数
// function getUrlParams(name) {
//     // location.search:可以获得url?后的参数
//     // 获取url后的参数并处理成数组s
//     var paramAry = location.search.substr(1).split("&");
//     // 循环数据
//     for (var i = 0; i < paramAry.length; i++) {
//         var tmp = paramAry[i].split("=");
//         if (tmp[0] == name) {
//             return tmp[1];
//         }
//     }
//     // 如果没有对应的参数
//     return -1;
// }



var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
    // 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function(categories) {
                    response.categories = categories;
                    console.log(response)
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            })

        }
    })
}

function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}