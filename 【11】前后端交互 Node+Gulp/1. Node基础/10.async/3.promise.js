// 导入fs模块
const fs = require("fs");

// 创建promise对象
// resolve:存储正确结果的参数
// reject:存储错误结果的参数
let promise = new Promise((resolve, reject) => {
    fs.readFile("./1.txt", "utf-8", (error, result) => {
        if (error != null) {
            // 执行错误
            reject(error);
        } else {
            // 执行正确
            resolve(result);
        }
    });
});

// then():执行正确
// catch():执行错误
promise.then((result) => {
    // 执行正确
    console.log(result);
}).catch((error) => {
    console.log(error);
});