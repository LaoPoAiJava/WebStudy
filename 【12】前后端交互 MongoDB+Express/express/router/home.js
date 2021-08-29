// 导入模块
const express = require("express");

// 定义二级路由
const home = express.Router();

// 具体响应
home.get("/index", (req, res) => {
    res.send("欢迎来到博客的首页");
});

// 导出
module.exports = home;