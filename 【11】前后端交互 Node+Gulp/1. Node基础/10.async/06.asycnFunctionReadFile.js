const fs = require("fs");
// 改造异步函数api 让其返回promise对象 从而支持异步函数语法
// require("util").promisify;中的promisify是一个方法
const promisify = require("util").promisify;
// 调用promisify方法改造异步函数API 让其返回promise对象
const readFile = promisify(fs.readFile);

// 定义运行函数
async function run() {
    let p1 = await readFile("./1.txt", "utf-8");
    let p2 = await readFile("./2.txt", "utf-8");
    let p3 = await readFile("./3.txt", "utf-8");
    console.log(p1);
    console.log(p2);
    console.log(p3);
}

run();