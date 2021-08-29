// 导入模板模块
const template = require("art-template");
const path = require("path");

let views = path.join(__dirname, "views", "index.art");

// 参数1：资源的绝对路径
// 参数2：数据对象
let html = template(views, {
    name: "老王",
    age: 18
});

console.log(html);