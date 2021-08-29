// 1. 创建服务器
// 2. 连接数据库

// 导入模块
const http = require("http");
const mongoose = require("mongoose");
const url = require("url");
const queryString = require("querystring");

// 创建服务器
const app = http.createServer();

// 服务器接收请求事件
app.on("request", async(req, res) => {
    // 实现路由
    const { pathname, query } = url.parse(req.url, true);
    // 获取请求方式
    const method = req.method.toLowerCase();
    // 判断请求方式
    if (method == "get") {
        if (pathname == "/" || pathname == "/list") {
            // 从MongoDB获取数据
            let users = await User.find();

            let list =
                `
            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>用户列表</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>

<body>
    <div class="container">
        <h6>
            <a href="/add" class="btn btn-primary">添加用户</a>
        </h6>
        <table class="table table-striped table-bordered">
            <tr>
                <td>用户名</td>
                <td>年龄</td>
                <td>爱好</td>
                <td>邮箱</td>
                <td>操作</td>
            </tr>
            <tr>
            `;

            // users是一个数组,那么就可以使用forEach()进行遍历
            users.forEach(item => {
                list +=
                    `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>
                `;

                // 循环遍历爱好
                item.hobbies.forEach(item => {
                    list += `<span>${item}</span>`;
                });

                list += `
                </td>
                <td>${item.email}</td>
                <td>
                    <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                    <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                </td>
            </tr>
                `;
            });

            list +=
                `
        </table>
    </div>
</body>

</html>
            `;
            res.end(list);
        } else if (pathname == "/add") {
            let add = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                      <div class="form-group">
                        <label>用户名</label>
                        <input type="text" name="name" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input type="password" name="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input type="text" name="age" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" name="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="足球" name="hobbies"> 足球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="篮球" name="hobbies"> 篮球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="烫头" name="hobbies"> 烫头
                            </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>`;

            res.end(add);

        } else if (pathname == "/modify") {
            // 根据id查出数据
            let user = await User.findOne({ _id: query.id });
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头', '吃饭', '睡觉', '打豆豆']
            let modify = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user.id}">
                      <div class="form-group">
                        <label>用户名</label>
                        <input type="text" value="${user.name}" name="name" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input type="password" value="${user.password}" name="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input type="text" value="${user.age}" name="age" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" value="${user.email}" name="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                        `;

            hobbies.forEach(item => {
                if (user.hobbies.includes(item)) {
                    modify += `
                    <label class="checkbox-inline">
                        <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                    </label> `;
                } else {
                    modify += `
                    <label class="checkbox-inline">
                        <input type="checkbox" value="${item}" name="hobbies"> ${item}
                    </label> `;
                }
            });


            modify +=
                `
                    </div>
                        </div>
                        <button type="submit" class="btn btn-primary">修改用户</button>
                    </form>
                </div>
                </body>
            </html>
            `;

            res.end(modify);
        } else if (pathname == "/remove") {
            // 获取地址传来的id
            await User.findOneAndDelete({ _id: query.id });
            // 重定向到首页
            res.writeHead(301, {
                Location: "/list"
            });
            res.end();
        }
    } else if (method == "post") {
        if (pathname == "/add") {

            // 把表单的数据存储到数据库
            // res.on(): 用来接收用户提交的数据
            // param: 获取表单的数据
            // formData: 拼接所获取的参数列表
            let formData = "";
            req.on("data", param => {
                formData += param;
            });

            // post参数接收完后要执行的操作
            req.on("end", async() => {
                // 将formData转成对象
                let userData = queryString.parse(formData);
                // 将数据存储到数据库
                await User.create(userData);
                // 保存后,重定向到list页面
                // 状态码301代表重定向
                res.writeHead(301, {
                    Location: "/list"
                });
                // res.end();一定要放到函数里面，不然服务器不知道你已经执行完了，会一直等待。
                res.end();
            });

        } else if (pathname == "/modify") {
            let formData = "";
            // 接收post参数
            req.on("data", (param) => {
                formData += param;
            });

            // post参数接收完成后
            req.on("end", async() => {
                // userData接收的是表单的数据
                let userData = queryString.parse(formData);
                // 保存到数据库
                // query.id是页面通过xxx?id=xxx传来的参数
                await User.updateOne({ _id: query.id }, userData);
                res.writeHead(301, {
                    Location: "/list"
                });
                res.end();
            });
        }
    }
});

// 监听端口
app.listen(3000);
console.log("服务器开启成功......");