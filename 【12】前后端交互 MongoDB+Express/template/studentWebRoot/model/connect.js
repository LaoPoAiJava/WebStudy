// -----------导入模板-----------
const mongoose = require("mongoose");

// -----------创建数据库-----------
mongoose.connect("mongodb://localhost:27017/playground")
    .then(() => console.log("数据库连接成功......"))
    .catch(err => console.log("数据库连接失败......"));