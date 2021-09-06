// 导入express
const express = require("express");
// 导入path
const path = require("path");
// 导入bodyParser第三方模块
const bodyParser = require("body-parser");

// 创建服务器
const app = express();

// 截取所有请求的body参数
// app.use(bodyParser.urlencoded());
// 如果接收的是json格式，那么要改成:app.use(bodyParser.json());
app.use(bodyParser.json());

// 截取所有请求,并配置静态资源路径
app.use(express.static(path.join(__dirname, "public")));

// first路由
app.get("/first", (req, res) => {
    res.status(400).send("Hello Ajax");
});

// resData路由
app.get("/resData", (req, res) => {
    res.send({ "name": "老王" });
});

// get
app.get("/get", (req, res) => {
    res.send(req.query);
});

// post
app.post("/post", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// json
app.post("/json", (req, res) => {
    res.send(req.body);
});

// error
app.get("/error", (req, res) => {
    res.status(400).send("ok");
});

// 监听端口
app.listen(3000);
console.log("服务器启动成功......");