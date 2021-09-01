// 导入模块
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// 导入joi模块
const joi = require("joi");

// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin:超级管理员
    // normal:普通用户
    role: {
        type: String,
        required: true
    },
    // 0:启用状态
    // 1:未启用状态
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model("User", userSchema);

// 创建joi验证规则的对象
function validateUser(user) {
    const schema = {
        username: joi.string().min(2).max(12).required().error(new Error("用户名不符合验证规则")),
        email: joi.string().email().error(new Error("邮箱不符合验证规则")),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error("密码不符合验证规则")),
        // valid():role字段只允许是normal和admin两个值的其中一个
        role: joi.string().required().valid("normal", "admin").error(new Error("角色不符合验证规则")),
        state: joi.number().required().valid(0, 1).error(new Error("状态不符合规则"))
    };

    // (validate是一个异步函数,是一个旧版本的函数,新版本已经删除了,14.3.1可以使用)
    // 参数1:将要验证的对象
    // 参数2:验证的规则
    return joi.validate(user, schema);
}


// 新增测试数据
// async function createData() {
//     console.log("create");
//     const salt = await bcrypt.genSalt(10)
//     const myPass = await bcrypt.hash("123456", salt);

//     // // 新增文档(测试)
//     const user = await User.create({
//         username: "老张",
//         email: "lz@qq.com",
//         password: myPass,
//         role: "admin",
//         state: 1
//     });
// }

// createData();

// 未来可以能开放一些其他的集合,所以将导出的结果封装成一个对象.
// 当导出的值是一个对象,并且对象的key和value名称相同时,可以简写成一个.
module.exports = {
    User,
    validateUser
}