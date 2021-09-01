const { Article } = require("../../model/article");

module.exports = async(req, res) => {

    // 在数据库查询所有article文档
    let articles = await Article.find().populate("author").lean();

    // --------------实现分页开始--------------
    // 当前页
    let page = req.query.page || 1;

    // // 每一页显示多少条数据
    let pageSize = 2;

    // // 总记录数
    let count = await Article.countDocuments({});

    // // 总页数
    let total = Math.ceil(count / pageSize);

    // // 每一页开始查询的数据
    let start = (page - 1) * pageSize;

    // 分页查询
    let pageData = await Article.find().limit(pageSize).skip(start).populate("author").lean();
    // --------------实现分页结束--------------

    // 渲染
    res.render("home/default", {
        articles: articles,
        pageData: pageData,
        page: page,
        total: total
    });

}