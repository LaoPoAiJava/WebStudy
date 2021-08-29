// -----------导入模板-----------
const mongoose = require("mongoose");

// -----------创建数据库集合规则-----------
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 1,
        max: 25
    },
    sex: String,
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
});

// -----------创建数据库集合-----------
const Student = mongoose.model("Student", studentSchema);

// 将学生信息集合进行导出
module.exports = Student;