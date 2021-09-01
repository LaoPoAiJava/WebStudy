// 导入数据集合
const { User } = require("../../model/user");
// 导入加密模块
const bcrypt = require("bcrypt");

// 修改用户信息action
module.exports = async(req, res, next) => {
    // 获取post参数
    const { username, email, role, state } = req.body;

    // 获取get参数
    const { id } = req.query;

    // 根据id查询信息,比对密码
    const user = await User.findOne({ _id: id });
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {
        // res.send("密码比对成功");

        // 根据id修改
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });

        // 重定向到用户列表
        res.redirect("/admin/user");

    } else {
        const obj = { path: "/admin/user-edit", message: "密码比对失败", id: id };
        // 将obj转换成字符串传递
        next(JSON.stringify(obj));
    }

}