// 导入user集合
const { User } = require("../../model/user");
const bcrypt = require("bcrypt");

login = async(req, res) => {
    // 获取post参数：解构
    const { email, password } = req.body;
    // 判断用户没有输入的情况
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render("admin/error", { msg: "邮箱或密码错误" });
    }
    // 判断用户输入
    // 从数据库中取出用户的邮箱和密码
    // findOne是一个异步函数
    let user = await User.findOne({ email });
    if (user) {
        // 查到数据了,判断是否一致
        // 判断加密后的密码
        const isValid = bcrypt.compare(password, user.password);
        if (isValid) {
            // 登录成功
            // 存储session
            req.session.username = user.username;
            // 存储role到session
            req.session.role = user.role;
            // 如果通过路由会每一个页面都要填写一次
            // 可以通过app.locals来解决,设置之后,只需要在模板里面引用即可
            req.app.locals.userInfo = user;
            if (user.role == "admin") {
                // 重定向到用户列表
                res.redirect("/admin/user");
            } else {
                // 普通用户
                // 重定向文章列表
                res.redirect("/home/");
            }

        } else {
            return res.status(400).render("admin/error", { msg: "邮箱或密码错误" });
        }
    } else {
        // 如果user为空,表示没有查到数据
        return res.status(400).render("admin/error", { msg: "邮箱或密码错误" });
    }
}

module.exports = login;