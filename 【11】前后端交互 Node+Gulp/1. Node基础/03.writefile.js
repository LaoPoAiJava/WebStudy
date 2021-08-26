// fs.writeFile('文件路径/文件名称', '数据', callback);

// 导入fs
const fs = require("fs");

// 如果该目录不存在demo.txt,那么会自动创建
fs.writeFile("./demo.txt", "我是老王。", err => {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log("写入成功");
});