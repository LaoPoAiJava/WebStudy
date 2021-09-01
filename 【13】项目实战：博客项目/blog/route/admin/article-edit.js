module.exports = (req, res) => {
    // 设置一个访问标识,如果值为user,则访问的是用户列表页面
    req.app.locals.currentLink = "article";

    // 渲染
    res.render("admin/article-edit");
}