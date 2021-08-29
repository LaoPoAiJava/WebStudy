// 导入模块
const express = require("express");

// 定义二级路由
const admin = express.Router();

// 具体响应
admin.get("/index", (req, res) => {
    res.send("欢迎来到博客的管理页");
});

// 导出
module.exports = admin;