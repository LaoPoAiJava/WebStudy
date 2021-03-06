// ajax函数的定义
function ajax(options) {

    // 存储的是默认值
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    };

    // 深拷贝：options会将defaults全部覆盖
    Object.assign(defaults, options);

    // 1. 创建ajax对象
    const xhr = new XMLHttpRequest();

    // 拼接参数定义
    let params = "";

    for (let attr in defaults.data) {
        params += attr + "=" + defaults.data[attr] + "&"
    }

    // 最后面多了个&,所以要进行截取
    params = params.substr(0, params.length - 1);

    // 判断请求类型是post还是get
    if (defaults.type == "get") {
        // 请求参数要在url后面
        defaults.url = defaults.url + "?" + params;
    }

    // 打开ajax
    xhr.open(defaults.type, defaults.url);

    // 如果是post请求
    if (defaults.type == "post") {
        // 设置请求头
        var contentType = defaults.header["Content-Type"];
        xhr.setRequestHeader("Content-Type", contentType);
        if (contentType == "application/json") {
            // 向服务器传送json数据
            xhr.send(JSON.stringify(defaults.data));
        } else {
            // 发送ajax
            xhr.send(params);
        }
    } else {
        // 发送ajax
        xhr.send();
    }

    // 接收响应数据
    // 在数据接收完成后,应该让调用API的开发人员来决定
    xhr.onload = function() {

        // 获取响应头的数据
        var contentType = xhr.getResponseHeader("Content-Type");

        var responseText = xhr.responseText;

        if (contentType.includes("application/json")) {
            // 如果是json,那么要将json字符串转成json对象
            responseText = JSON.parse(responseText);
        }

        if (xhr.status == 200) {
            // 因为API有形参传入,所以这里的参数要有实参
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }

    }
}