// 通过npm下载MongoDB
// 命令:npm install mongoose
// MongoDB停止服务:net stop mongodb
// MongoDB开启服务:net start mongodb

// 导入数据库相关的模块
const mongoose = require("mongoose");

// connect("MongoDB://域名/数据库名"):返回一个promise对象
// 如果数据没有创建,那么会自动被创建
mongoose.connect("mongodb://loca1lhost/playground", { useNewUrlParser: true })
    .then(() => console.log("数据库连接成功"))
    .catch(error => console.log(error, "数据库连接失败"));