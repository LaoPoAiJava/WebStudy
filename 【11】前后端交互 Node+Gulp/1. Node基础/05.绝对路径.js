// 大多数情况下使用绝对路径，因为相对路径有时候相对的是命令行工具的当前工作目录
// 使用__dirname获取当前文件所在的绝对路径

// 导入模块
const fs = require("fs");
const path = require("path");

console.log(__dirname);

let filePath = path.join(__dirname, "01.module_a.js");

fs.readFile(filePath, "utf-8", (err, doc) => {
    console.log(err);
    console.log(doc);
});