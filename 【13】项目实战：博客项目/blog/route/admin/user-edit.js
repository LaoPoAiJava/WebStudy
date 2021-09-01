// 导入数据集合
const { User } = require("../../model/user");

module.exports = async(req, res) => {

    // 设置一个访问标识,如果值为user,则访问的是用户列表页面
    req.app.locals.currentLink = "user";

    // 获取get请求参数
    const { message, id } = req.query;

    // 因为新增页码和修改页面是一个文件
    // 需要判断此次请求是哪一种操作,即新增或修改
    // 当id存在时,修改操作.当id为空,新增操作
    if (id) {
        // 修改操作
        // 通过id查询数据
        const user = await User.findOne({ _id: id });

        // 将数据返回给art模板
        // 渲染
        res.render("admin/user-edit", {
            message: message,
            user: user,
            link: "/admin/user-modify?id=" + id,
            button: "修改"
        });


    } else {
        // 新增操作
        // 渲染
        res.render("admin/user-edit", {
            message: message,
            link: "/admin/user-add",
            button: "新增"
        });
    }




}