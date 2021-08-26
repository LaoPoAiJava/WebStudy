// 引入模块:
// const fs = require('fs');
// fs.reaFile('文件路径/文件名称'[,'文件编码'], callback);

// 导入fs模块
const fs = require("fs");

fs.readFile("./01.module_a.js", "utf-8", (err, doc) => {
    // 回调函数
    // err:如果读取文件出错,err为错误信息,没出错为null
    console.log(err);
    console.log(doc);
});