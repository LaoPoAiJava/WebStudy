// 创建文档的第二种方式

// 导入MongoDB模块
const mongoose = require("mongoose");

// 创建连接
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true })
    .then(() => {
        console.log("数据库连接成功");
    })
    .catch(error => {
        console.log("数据库连接失败", error);
    });

// 创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 创建集合
const Course = mongoose.model("Course", courseSchema);


// 创建文档(第一种方式)
// Course.create({
//     name: "JavaScript",
//     author: "小王",
//     isPublished: true
// }, (err, result) => {
//     console.log(err);
//     console.log(result);
// });

// 创建文档（第二种方式）
// Course.create({
//     name: "Java",
//     author: "老王",
//     isPublished: true
// }).then(result => console.log(result));