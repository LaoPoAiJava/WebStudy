// 导入http模块
const http = require("http");
const url = require("url");

// 创建服务器
const app = http.createServer();

// 接收请求事件
app.on("request", (req, res) => {
    // 获取url
    let pathname = url.parse(req.url).pathname;
    // 设置格式和编码
    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8"
    });
    // 获取请求方法
    const method = req.method.toLowerCase();
    // 判断和执行
    if (method == "post") {
        if (pathname == "/" || pathname == "/index") {
            res.end("欢迎来到首页");
        } else if (pathname == "/list") {
            res.end("欢迎来到list");
        } else {
            res.end("404");
        }
    }

    if (method == "get") {
        if (pathname == "/" || pathname == "/index") {
            res.end("欢迎来到首页");
        } else if (pathname == "/list") {
            res.end("欢迎来到list");
        } else {
            res.end("404");
        }
    }
});

// 监听端口
app.listen(3000);

// 输出测试
console.log("服务器启动成功......");