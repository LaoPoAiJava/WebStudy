// 导入MongoDB模块
const mogoose = require("mongoose");

// 创建连接
mogoose.connect("mongodb://localhost/playground", { useNewUrlParser: true })
    .then(() => {
        console.log("数据库连接成功");
    })
    .catch((error) => {
        console.log(error, "数据库连接失败");
    });

// 创建集合规则
const courseSchema = new mogoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 创建集合(Course是一个构造函数)
// 参数一:集合的名称
// 参数二:集合的规则
const Course = mogoose.model("Course", courseSchema);

// 创建文档
const course = new Course({
    name: "Node.js",
    author: "老王",
    isPublished: true
});
course.save();