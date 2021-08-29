// 导入模块
const express = require("express");

// 创建服务器
const app = express();

// 拦截所有请求
// use的参数是一个函数
// app.use(fn());

// 自定义一个函数传递到use方法中
// 因为use的参数是一个函数,所有要return一个函数,而且参数也要保持一致
// 案例1：证明了fn函数被调用了
// function fn() {
//     return function(req, res, next) {
//         console.log(req.method);
//         next();
//     }
// }
// // 路由
// app.get("/", (req, res) => {
//     res.end("ok");
// });

// 案例2
// app.use(fn({ name: "老王" }));

// // use的fn里传递一个对象
// // 所以fn也要有一个形参
// function fn(obj) {
//     return function(req, res, next) {
//         if (obj.name == "老王") {
//             console.log("老王");
//         } else {
//             console.log("不是老王");
//         }
//         console.log(req.method);
//         next();
//     }
// }


// 路由
app.get("/", (req, res) => {
    res.end("ok");
});

// 设置监听端口
app.listen(3000);
console.log("服务器启动成功......");