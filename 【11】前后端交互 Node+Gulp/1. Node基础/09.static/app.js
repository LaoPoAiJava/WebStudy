// 引入模块
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mime = require("mime");

// 创建服务器
const app = http.createServer();

// 接收请求
app.on("request", (req, res) => {
    // 获取资源路径
    let pathname = url.parse(req.url).pathname;
    // 需求:如果客户访问服务器时,地址中只填写了域名,我们也希望服务器响应default页面给浏览器
    pathname = pathname == "/" ? "/default.html" : pathname;
    // 根据浏览器的地址得到资源在服务器的路径
    let realPath = path.join(__dirname, "public" + pathname);
    // 获取所有可能的响应格式
    let type = mime.getType(realPath);

    // 读取文件
    fs.readFile(realPath, (error, result) => {
        if (error != null) {
            res.writeHead(404, { "content-type": "text/html;charset=utf-8" });
            res.end("文件读取失败");
            return;
        }

        // 设置响应格式
        res.writeHead(200, {
            //因为访问服务器时,有很多格式
            "content-type": type
        });

        // 成功,将文件内容返回给浏览器
        res.end(result);
    });
});

// 监听
app.listen(3000);
console.log("服务器启动成功....");