// 导入express服务器模块
const express = require('express');
// 导入参数处理模块
const bodyParser = require('body-parser');

// 创建服务器
const app = express();

// 处理静态资源
app.use(express.static('public'));

// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置允许跨域访问该服务
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,mytoken");
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Headers', 'mytoken');
    next();
});

app.get('/data', (req, res) => {
    res.send('Hello ajax!');
})

app.get('/data2', (req, res) => {
    res.send('Hello ajax2!');
})

app.get('/data3', (req, res) => {
    res.send('Hello ajax3!');
})

// promise对象方法路由
app.get('/p1', (req, res) => {
    res.send('Hello p1!');
});
app.get('/p2', (req, res) => {
    res.send('Hello p2!');
});
app.get('/p3', (req, res) => {
    res.send('Hello p3!');
});

// fetch路由
app.get("/fdata", (req, res) => {
    res.send("Hello Fetch");
});

app.get("/books", (req, res) => {
    // 获取id
    var id = req.query.id;
    res.send("传统get请求： " + id);
});

// RESTful风格的get请求参数要用:id作为占位符
app.get("/books/:id", (req, res) => {
    // RESTful风格的get请求参数要用params
    var id = req.params.id
    res.send("RESTful风格的get请求参数:" + id);
});

// RESTful风格的delete请求参数要用:id作为占位符
app.delete("/books/:id", (req, res) => {
    // RESTful风格的delete请求参数要用params
    var id = req.params.id
    res.send("RESTful风格的delete请求参数:" + id);
});

// 接收一般形式的POST请求参数
app.post("/books", (req, res) => {
    // post的参数要通过body-parser中间件接收数据
    res.send("name:" + req.body.name + "----" + "age:" + req.body.age);
});

app.put("/books/:id", (req, res) => {
    // post的参数要通过body-parser中间件接收数据
    res.send("id:" + req.params.id + "----name:" + req.body.name + "----" + "age:" + req.body.age);
});

app.get("/json", (req, res) => {
    res.send({
        name: "lw",
        age: 18
    });
});

// axios1
app.get("/axios1", (req, res) => {
    res.send("Hello axios1");
});

// /getUrlAxios?id=1
app.get("/getUrlAxios", (req, res) => {
    // 接收get url方式传递的参数
    res.send("axios get url : " + req.query.id);
});

// /getRustAxios/1
app.get("/getRustAxios/:id", (req, res) => {
    // 接收get Restful方式传递的参数
    res.send("axios get Restful : " + req.params.id);
});

// axios:get 通过axios中的params对象传递
app.get("/getParamsAxios", (req, res) => {
    // 通过axios中的params对象传递的参数要用query接收
    res.send("axios get params : " + req.query.id);
});

// /postJsonAxios
app.post("/postJsonAxios", (req, res) => {
    // post参数要用body来接收
    res.send("post json axios:" + req.body.name + "----" + req.body.pwd);
});

// /postUrlAxios
app.post("/postUrlAxios", (req, res) => {
    res.send("post url axios:" + req.body.name + "----" + req.body.age);
});

// /putJsonAxios
app.put("/putJsonAxios", (req, res) => {
    res.send("post url axios:" + req.body.name + "----" + req.body.pwd);
});

// /getResponse
app.get("/getResponse", (req, res) => {
    // 返回一个json
    res.json({
        name: "zd",
        age: 26
    });
});

// /interceptors
app.get("/interceptors", (req, res) => {
    res.send("ok");
});

// /async1
app.get("/async1", (req, res) => {
    res.send("hi");
});
app.get("/async2", (req, res) => {
    if (req.query.info == "hi") {
        res.send("ok");
    } else {
        res.send("error");
    }
});


// 监听端口
app.listen(3000);