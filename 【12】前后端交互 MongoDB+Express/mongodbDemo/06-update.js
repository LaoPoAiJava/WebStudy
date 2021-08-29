// 引入模块
const mongoose = require("mongoose");

// 连接
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true })
    .then(() => console.log("数据库连接成功"))
    .catch(error => console.log("数据库连接错误", error));

// 集合规则
const myScheme = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

// 创建模式
const User = mongoose.model("User", myScheme);

// 如果匹配了多条文档, 只会删除匹配成功的第一条文档
User.updateOne({ name: '李四' }, { age: 120, name: '李狗蛋' }).then(result => console.log(result));
// 找到要删除的文档并且删除
User.updateMany({}, { age: 300 }).then(result => console.log(result));