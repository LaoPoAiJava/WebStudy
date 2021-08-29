const express = require("express");

const app = express();

// 默认情况下,执行了一次路由就不会再执行了
// 但是加了next参数后,会继续执行下一个路由
app.get("/request", (req, res, next) => {
    req.name = "老王";
    next();
});

app.get("/request", (req, res) => {
    res.send(req.name);
});

app.listen(3000);
console.log("服务器启动成功......");