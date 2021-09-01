// 导入数据库模块
const { Article } = require("../../model/article");

module.exports = async(req, res) => {
    // 设置一个访问标识,如果值为user,则访问的是用户列表页面
    req.app.locals.currentLink = "article";

    // 当前页
    let page = req.query.page || 1;

    // 每页显示的数据
    let pageSize = 2;

    // 查询数据的总数
    let count = await Article.countDocuments({});

    // 总页数
    let total = Math.ceil(count / pageSize);

    // 每一页开始的数据
    /*
    1 0-9 10
    2 10-19 10
    3 20-29 10
    (n-1)*d => (n-1)*10
    */
    let start = (page - 1) * pageSize;

    // 获取所有文章得到信息
    // 当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面。所以报错
    // 利用 lean（） 方法将多级联合的结果转化为普通对象 ，缓解两者的冲突。
    // .lean()
    let articles = await Article.find().limit(pageSize).skip(start).populate("author").lean();

    // res.send(articles);
    // 渲染
    res.render("admin/article", {
        articles: articles,
        page: page,
        total: total
    });
}