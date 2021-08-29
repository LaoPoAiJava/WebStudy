// 导入模块
const express = require("express");

// 创建服务器
const app = express();

app.get("/index", (req, res) => {
    console.log(req.query);
    res.end("ok");
});

// 设置监听端口
app.listen(3000);
console.log("服务器启动成功......");