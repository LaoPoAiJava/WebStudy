// 引入express框架
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
// 创建网站服务器
const app = express();

app.use("/admin", (req, res, next) => {
    let isLogin = true;
    if (isLogin) {
        // 登录
        next();
    } else {
        // 登录失败
        res.send("你还没有登录");
    }
});

app.get("/admin", (req, res) => {
    res.send("登录成功");
});

app.use((req, res, next) => {
    // 设置状态码status()
    res.status(404).send("有错误");
});

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');