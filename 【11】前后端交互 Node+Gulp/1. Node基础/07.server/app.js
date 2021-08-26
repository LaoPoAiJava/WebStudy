// 导入http模块
const http = require("http");
// 导入url模块
const url = require("url");

// 创建服务器对象
const app = http.createServer();

// 当客户端有请求来的时候
app.on("request", (req, res) => {
    // 请求req的常用API:
    // 1. 获取请求方式:req.method
    // 2. 获取请求地址:req.url
    // 3. 获取请求报文:req.header["key"]

    // res常用API:
    // 设置响应头
    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8"
    });

    // url有新的API

    // url.parse():以对象的形式获取地址栏的所有信息
    // 但是parse()不推荐使用了
    console.log(req.url); // 未处理
    console.log(url.parse(req.url, true)); // 处理过后的
    let { query, pathname } = url.parse(req.url, true);
    console.log(query.name)
    console.log(query.age)

    if (pathname == '/index' || pathname == '/') {
        res.end('<h2>欢迎来到首页</h2>');
    } else if (pathname == '/list') {
        res.end('welcome to listpage');
    } else {
        res.end('not found');
    }
});

// 设置监听端口
app.listen(3000);
console.log("网站服务器启动成功");