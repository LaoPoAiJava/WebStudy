// 引入express框架
const express = require('express');
const fs = require("fs");
// 创建网站服务器
const app = express();

app.get("/index", (req, res, next) => {
    // throw new Error();
    // res.send("ok");

    fs.readFile("./01.js", "utf-8", (err, result) => {
        if (err != null) {
            // 如果遇到错误,将错误信息传给next()
            next(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// 错误处理中间件
// 当抛出异常时执行
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');