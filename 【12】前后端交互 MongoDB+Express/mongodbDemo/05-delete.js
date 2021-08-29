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

// User.findOneAndDelete({ id: "c09f1e5aeb04b22f8460965" })
//     .then(result => console.log(result));
User.deleteMany({}).then(result => console.log(result))