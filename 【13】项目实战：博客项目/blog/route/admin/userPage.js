// 导入数据集合
const { User } = require("../../model/user");

module.exports = async(req, res) => {

    // 设置一个访问标识,如果值为user,则访问的是用户列表页面
    req.app.locals.currentLink = "user";

    // 当前页
    let page = req.query.page || 1;

    // 每页显示的数据
    let pageSize = 5;

    // 查询数据的总数
    let count = await User.countDocuments({});

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

    // 查询所有的用户集合
    const users = await User.find({}).limit(pageSize).skip(start);

    // res.render():渲染方法
    // 参数1:要渲染页面的路由
    // 参数2:要传递到页面的数据对象
    res.render("admin/user", {
        users: users,
        page: page,
        total: total
    });

    // send():将数据直接发送到浏览器显示
    // res.send(users);

}