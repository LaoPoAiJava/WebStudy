// 导入模块
const express = require("express");
const path = require("path");

// 创建服务器
const app = express();

// 告诉express框架你要使用什么模板引擎渲染什么后缀的模板文件
// 参数1：模板引擎的后缀
// 参数2：要使用的模板引擎
app.engine("art", require("express-art-template"));

// 告诉express模板存放的位置
app.set("views", path.join(__dirname, "views"));

// 告诉express框架默认的后缀名
app.set("view engine", "art");

app.get("/index", (req, res) => {
    // 当路由是/index时,render方法自动找到views中的index.art文件
    res.render("index", {
        msg: "老王"
    });
});

// 设置监听端口
app.listen(3000);
console.log("服务器启动成功......");