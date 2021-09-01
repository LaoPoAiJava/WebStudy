// 导入模块
const express = require("express");

// 获取路由对象
const admin = express.Router();

// 二级路由
// 创建登录页面的get二级路由：访问
admin.get("/login", require("./admin/loginPage"));

// 创建登录页面的post二级路由：点击登录
admin.post("/login", require("./admin/login"));

// 渲染用户列表的二级路由
admin.get("/user", require("./admin/userPage"));

// 实现用户退出的二级路由
admin.get("/logout", require("./admin/logout"));

// 渲染新增用户页面的路由
admin.get("/user-edit", require("./admin/user-edit"));

// 新增用户的路由
admin.post("/user-edit", require("./admin/user-edit-fn"));

// 修改用户的路由
admin.post("/user-modify", require("./admin/user-modify"));

// 删除用户的路由
admin.get("/delete", require("./admin/user-delete"));

// 文章列表渲染路由
admin.get("/article", require("./admin/article"));

// 文章修改渲染路由
admin.get("/article-edit", require("./admin/article-edit"));

// 文章新增路由
admin.post("/article-add", require("./admin/article-add"));

// 将admin路由对象导出
module.exports = admin;