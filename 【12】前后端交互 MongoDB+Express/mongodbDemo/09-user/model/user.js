const mongoose = require("mongoose");
// 创建集合规则
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    hobbies: [String]
});
// mongoimport –d 数据库名称 –c 集合名称 -–file 要导入的数据文件
// 创建集合
const User = mongoose.model("User", userSchema);