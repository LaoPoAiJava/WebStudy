// 引入mongoose模块
const mongoose = require('mongoose');

// 创建连接
mongoose.connect("mongodb://ljm:ljm@localhost:27017/todo", { useNewUrlParser: true })
    .then(() => console.log("数据库连接成功......"))
    .catch(() => console.log("数据库连接失败......"));

// 创建任务集合规则
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });
// 创建todo集合
const Task = mongoose.model('task', taskSchema);

// 新增文档(测试)
// async function createData() {
//     const task = await Task.create({
//         title: "打豆豆",
//         completed: false
//     });
// }
// createData();

// 将集合构造函数作为模块成员进行导出
module.exports = {
    Task: Task
}