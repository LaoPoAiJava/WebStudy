// 导入模块
const express = require("express");
const bodyParser = require("body-parser");

// 创建服务器
const app = express();

// 拦截所有请求
// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended: true 方法内部使用第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/add", (req, res) => {
    // body属性是bodyParser模块添加进去的
    res.send(req.body);
});


// 设置监听端口
app.listen(3000);
console.log("服务器启动成功......");