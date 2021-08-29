// 返回值:专门用来获取路由对象的方法
const getRouter = require("router");
const Student = require("../model/user");
const template = require("art-template");
const querystring = require("querystring");

// -----------获取路由对象-----------
const router = getRouter();
// -----------设置index路由-----------
router.get("/index", (req, res) => {

    // 使用模板来渲染到页面
    const html = template("index.art", {});

    res.end(html);
});

// -----------设置list路由-----------
router.get("/list", async(req, res) => {

    // 异步函数只有添加了await关键字才能接收返回值
    let students = await Student.find();

    // 使用模板来渲染到页面
    const html = template("list.art", {
        students: students
    });
    res.end(html);
});

router.post("/add", (req, res) => {
    let formData = "";

    // 接收数据
    req.on("data", (param) => {
        formData += param;
    });

    // 接收完数据后
    req.on("end", async() => {
        // 将获取到的值转换成对象
        // 存储到数据库
        await Student.create(querystring.parse(formData));

        res.writeHead(301, {
            Location: "/list"
        });
        res.end();
    });
});

module.exports = router;