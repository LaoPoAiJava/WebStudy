// 导入模块
const express = require("express");

// 获取路由对象
const home = express.Router();

// 渲染首页
home.get("/", require("./home/index"));

// 渲染文章详情
home.get("/article", require("./home/article"));

// 新增评论文档
home.post("/comment", require("./home/comment"));

// 将home路由对象导出
module.exports = home;