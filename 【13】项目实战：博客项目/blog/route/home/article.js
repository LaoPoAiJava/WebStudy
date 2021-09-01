// 导入article集合
const { Article } = require("../../model/article");
// 导入数据库
const { Comment } = require("../../model/comment");

module.exports = async(req, res) => {
    // 获取文章id
    const id = req.query.id;

    // 获取get参数
    let article = await Article.findOne({ _id: id }).populate("author").lean();

    // 根据文章id查询所有的评论信息
    const comments = await Comment.find({ aid: id }).populate("uid").lean();

    // 渲染
    res.render("home/article", {
        article: article,
        comments: comments
    });

}