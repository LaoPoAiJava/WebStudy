const user = require("../model/user");

guard = (req, res, next) => {
    if (req.url != "/login" && !req.session.username) {
        // 没有登录
        res.redirect("/admin/login");
    } else {
        // 普通用户
        if (req.session.role == "normal") {
            // 重定向到文章列表
            return res.redirect("/home/");
        }
        // 正常放行
        next();
    }
}

module.exports = guard;