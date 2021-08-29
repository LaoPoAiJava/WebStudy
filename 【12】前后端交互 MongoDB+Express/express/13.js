// 导入模块
const express = require("express");
const path = require("path");

// 创建服务器
const app = express();

// 通过express设置静态资源的路径
// 访问地址:http://localhost:3000/default.html
// 不用写public
// 此时的use的第一个参数是设置访问别名
app.use("static", express.static(path.join(__dirname, "public")));



// 设置监听端口
app.listen(3000);
console.log("服务器启动成功......");