// 导入bcrypt
const bcrypt = require("bcrypt");

async function run() {
    // 生成随机字符串,默认值为10
    // 这个方法是一个异步函数
    const salt = await bcrypt.genSalt(10);
    // 对密码进行加密
    // 参数1:要进行加密的明文
    // 参数2:随机字符串
    // 返回值:加密后的密码
    // hash()同样是一个异步函数
    const p = await bcrypt.hash("123456", salt);
    console.log(salt);
    console.log(p);
}

run();