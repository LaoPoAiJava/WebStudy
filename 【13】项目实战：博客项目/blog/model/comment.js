// 引入mongoose
const mongoose = require("mongoose");

// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    // 评论人id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // 评论时间
    time: {
        type: Date
    },
    content: {
        type: String
    }
});

// 创建集合
const Comment = mongoose.model("Comment", commentSchema);

// 导出
module.exports = {
    Comment
}