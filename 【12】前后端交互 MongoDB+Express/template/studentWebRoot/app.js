// -----------导入模板-----------
const http = require("http");
const path = require("path");
const Student = require("./model/user");
const router = require("./router/index.js");
const template = require("art-template");

const dateformat = require("dateformat");
// 返回值:是一个方法
const serveStatic = require("serve-static");
// 返回值:专门用来获取路由对象的方法
const getRouter = require("router");
require("./model/connect");

// -----------创建服务器-----------
const app = http.createServer();

// -----------设置模板的根目录-----------
template.defaults.root = path.join(__dirname, "views");;
// 将dateformat方法导入模板
template.defaults.imports.dateformat = dateformat;
// -----------获取静态资源访问服务-----------
const serve = serveStatic(path.join(__dirname, "public"));

// -----------服务器接收请求-----------
app.on("request", (req, res) => {
    // router的第三个参数是必写
    router(req, res, () => {});
    // serve的第三个参数是必写
    serve(req, res, () => {});
});

// -----------监听服务器80端口-----------
app.listen(80);

// -----------测试服务器是否开启成功-----------
console.log("服务器开启成功......");