// 导入上传文件的模块
const formidable = require("formidable");
// 导入数据库模块
const { Article } = require("../../model/article");

// 导入路径模块
const path = require("path");

module.exports = (req, res) => {

    // 创建表单解析对象
    const form = new formidable.IncomingForm();

    // // 配置文件存储的路径
    form.uploadDir = path.join(__dirname, "../", "../", "public", "upload");

    // 配置是否保留文件扩展名
    // true:保留扩展名
    // false:不保留扩展名
    form.keepExtensions = true;

    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
        // 2.fields 对象类型 保存普通表单数据
        // 3.files 对象类型 保存了和上传文件相关的数据
        // 将数据添加到数据库集合中
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split("public")[1],
            content: fields.content
        });

        // 重定向到文章列表页面
        res.redirect("/admin/article");
    });

}