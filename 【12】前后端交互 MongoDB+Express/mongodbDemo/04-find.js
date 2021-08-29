// 导入模块
const mongoose = require("mongoose");

// 创建连接
mongoose.connect("mongodb://localhost/playground", { useNewUrlParser: true })
    .then(() => console.log("数据库连接成功"))
    .catch(error => console.log("数据库连接错误", error));

// 创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

// // 创建集合
const User = mongoose.model("User", userSchema);

// 查询User集合中所有的文档
// 执行失败，原因未知
// find()都报错。
// find返回的是一个数组
// User.find().then(result => console.log(result));

// findOne返回的是一个对象
// User.findOne({ name: '李四' })
//     .then(result => console.log(result));

// 查询用户集合中年龄字段大于20并且小于40的文档
// User.find({ age: { $gt: 20, $lt: 40 } }).then(result => console.log(result));

// 查询用户集合中hobbies字段值包含足球的文档
// User.find({hobbies: {$in: ['足球']}}).then(result => console.log(result))

// 选择要查询的字段
// User.find().select('name email -_id').then(result => console.log(result))

// 根据年龄字段进行升序排列
// User.find().sort('age').then(result => console.log(result))

// 根据年龄字段进行降序排列
// User.find().sort('-age').then(result => console.log(result))

// 查询文档跳过前两条结果 限制显示3条结果
// User.find().skip(2).limit(3).then(result => console.log(result))