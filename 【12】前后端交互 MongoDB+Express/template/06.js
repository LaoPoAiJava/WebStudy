const template = require("art-template");
const path = require("path");
const dateFormat = require("dateformat");

// 向模板导入变量：将dateFormat变量导入模板
template.defaults.imports.dateFormat = dateFormat;

// 设置模板的根目录
template.defaults.root = path.join(__dirname, "views");

// 设置模板的默认后缀
// 设置成html就会找html
// template.defaults.extname = ".html";
template.defaults.extname = ".art";

// 当设置了模板的根目录时,第一个参数可以只填写文件名,template会自动在根目录找这个文件
// 当设置了模板的默认后缀,第一个参数可以只填写文件名,不用写后缀
const html = template("06", {
    // 当Date格式不进行转换的结果：&#34;2021-08-28T02:26:17.070Z&#34;
    time: new Date()
});

console.log(html);