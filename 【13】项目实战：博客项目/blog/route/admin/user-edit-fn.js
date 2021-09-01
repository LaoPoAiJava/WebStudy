// 导入数据集合
const { User, validateUser } = require("../../model/user");
// 导入加密模块
const bcrypt = require("bcrypt");

// 导出集合验证信息
module.exports = async(req, res, next) => {
    // 获取post里面的参数
    // 因为在请求的时候,app.js中的use中间件通过bodyParser已经截取到了post的参数,并存储到了req.body中
    // 具体代码:app.use(bodyParser.urlencoded({ extended: false }));

    // 开始验证
    try {
        // 验证post请求的参数
        await validateUser(req.body);
    } catch (e) {
        // 验证不通过,重定向到用户列表页面并显示错误信息
        // next():只能传递一个字符串类型的参数
        // 如果想要传送多个参数,那么要传递一个对象,并且要将对象转换成一个字符串类型
        // {path : xx, message : xx}
        // JSON.stringify():可以将一个对象转换成字符串
        return next(JSON.stringify({ path: "/admin/user-edit", message: e.message }));
    }

    // 如果验证通过,说明用户输入的没有问题
    // 可以开始通过数据库验证邮箱是否已经注册
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        // 如果user存在,说明邮箱已经被注册
        // 重定向到用户添加页面
        // redirect方法内部已经调用了res.send方法,所以要加上return
        return next(JSON.stringify({ path: "/admin/user-edit", message: "邮箱已经被注册" }));
    }

    // 如果user不存在,说明当前邮箱可以使用
    // 对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    // 保存到数据库
    await User.create(req.body);
    // 重定向到用户列表
    res.redirect("/admin/user");

}