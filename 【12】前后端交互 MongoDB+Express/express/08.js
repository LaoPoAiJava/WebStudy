// 导入模块
const express = require("express");
const admin = require("./router/admin");
const home = require("./router/home");

// 创建服务器
const app = express();

// 一级路由
app.use("/home", home);
app.use("/admin", admin);


// 设置监听端口
app.listen(3000);
console.log("服务器启动成功......");