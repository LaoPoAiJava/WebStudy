// 导入http模块
const http = require("http");
// 导入字符串转换对象
const querystring = require("querystring");

// 创建服务器对象
const app = http.createServer();

app.on("request", (req, res) => {

    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8"
    });

    let postParams = "";

    // 接收post请求
    // data 当请求参数传递的时候出发data事件
    // end 当参数传递完成的时候出发end事件
    req.on("data", params => {
        postParams += params;
    });

    req.on("end", () => {
        console.log(querystring.parse(postParams));
    });
    res.end('ok');
});

// 设置监听端口
app.listen(3000);
console.log("服务器开启成功");