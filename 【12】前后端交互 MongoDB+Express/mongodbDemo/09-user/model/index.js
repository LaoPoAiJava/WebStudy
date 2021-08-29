const mongoose = require("mongoose");

// 连接mongodb
mongoose.connect("mongodb://localhost:27017/playground", { useNewUrlParser: true })
    .then(() => console.log("数据库连接成功......"))
    .catch(() => console.log("数据库连接失败......"));