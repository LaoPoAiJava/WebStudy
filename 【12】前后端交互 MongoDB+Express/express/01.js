// 导入模块
const express = require("express");

// 创建服务器
const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.get("/list", (req, res) => {
    res.send("Hello List");
});



// 监听端口
app.listen(3000);
console.log("服务器启动成功......");