// 导入数据库
const { Comment } = require("../../model/comment");

module.exports = async(req, res) => {

    // 获取浏览器的post参数
    const { content, aid, uid } = req.body;

    // 创建文档
    await Comment.create({
        aid: aid,
        uid: uid,
        time: new Date(),
        content: content
    });

    // 重定向到文章详情页面
    res.redirect("/home/article?id=" + aid);
}