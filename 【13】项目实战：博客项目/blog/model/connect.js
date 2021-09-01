// 导入模块
const mongoose = require("mongoose");
// 导入config模块
const config = require("config");

// 创建连接
mongoose.connect(`mongodb://${config.get("db.user")}:${config.get("db.pwd")}@${config.get("db.host")}:${config.get("db.port")}/${config.get("db.name")}`, { useNewUrlParser: true })
    .then(() => console.log("数据库连接成功......"))
    .catch(() => console.log("数据库连接失败......"));