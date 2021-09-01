// 导入express框架模块
const express = require("express");
// 导入路由模块
const home = require("./route/home");
const admin = require("./route/admin");
// 导入path模块
const path = require("path");
// 导入数据库连接模块
require("./model/connect");
// 导入获取post参数的模块
const bodyParser = require("body-parser");
// 导入session模块
const session = require("express-session");
// 导入dateformat模块
const dateFormat = require("dateformat");
// 导入art-template模块
const template = require("art-template");
// 导入morgan第三方模块
const morgan = require("morgan");
// 导入config模块
const config = require("config");

// 创建服务器
const app = express();

// 判断是开发环境还是生产环境
if (process.env.NODE_ENV == "development") {
    console.log("开发环境");
    // 在开发环境打印每一个请求的信息
    app.use(morgan("dev"));
} else {
    console.log("生产环境");
}

// -------------template设置-------------
// 告诉express框架模板在哪个文件夹
app.set("views", path.join(__dirname, "views"));
// 告诉express框架默认后缀是什么
app.set("view engine", "art");
// 当渲染.art模板时,所使用的模板是什么
app.engine("art", require("express-art-template"));

// 配置模板的全局变量
template.defaults.imports.dateFormat = dateFormat;


// use中间件是从上到下按顺序执行的!!!

// 使用use中间件对body-parser模块进行配置
// bodyParser会在request请求添加一个body属性,存放post参数
app.use(bodyParser.urlencoded({ extended: false }));

// 拦截所有的浏览器请求
app.use(session({ secret: "secret key" }));

// 开放静态资源文件
// 静态资源的外链链接是由浏览器来解析
app.use(express.static(path.join(__dirname, "public")));

// 拦截请求,判断用户是否登录
// 参数1:获取以/admin开头的路径
// 输入的地址:localhost/admin/login
// req.url:/login
app.use("/admin", require("./middleware/loginGuard"));


// 一级路由:
//  如果访问的/home,由home二级路由执行
//  如果访问的/admin,由admin二级路由执行
app.use("/home", home);
app.use("/admin", admin);

// 请求错误处理
app.use((err, req, res, next) => {
    // 当接收到错误信息,将字符串转换成对象
    // { path: "/admin/user-edit", message: "密码比对失败", id: id }

    // 因为传递来的是一个对象,则使用for in遍历
    // 并转换成=和&分隔的字符串:message=xxx&id=xxx
    let params = [];
    const result = JSON.parse(err);
    for (let key in result) {
        if (key != "path") {
            params.push(key + "=" + result[key]);
        }
    }
    res.redirect(result.path + "?" + params.join("&"));
});

// 监听端口
// 如果监听的是80端口,那么在地址栏访问时可以不输入端口号
app.listen(80);
console.log("服务器启动成功......");