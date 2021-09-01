module.exports = (req, res) => {
    // 销毁session
    req.session.destroy(function() {
        // 注销cookie
        res.clearCookie("connect.sid");

        // 清除locals
        req.app.locals = null;

        // 重定向
        res.redirect("/admin/login");
    });

}