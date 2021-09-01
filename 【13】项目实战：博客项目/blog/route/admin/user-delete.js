// 导入数据集合
const { User } = require("../../model/user");

module.exports = async(req, res) => {
    // 通过get参数获取id,调用数据库API删除
    await User.findByIdAndDelete({ _id: req.query.id });

    // 重定向到用户列表
    res.redirect("/admin/user");
}