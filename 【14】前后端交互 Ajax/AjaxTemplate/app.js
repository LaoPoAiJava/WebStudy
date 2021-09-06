// 导入express
const express = require("express");
// 导入path
const path = require("path");
// 导入formidable
const formidable = require("formidable");
// 导入task模块
const { Task } = require("./model/task");
// 导入bodyparser模块
const bodyParser = require("body-parser");
// 导入lodash
const _ = require('lodash');

// 创建服务器
const app = express();

// 截取所有请求,并配置静态资源路径
app.use(express.static(path.join(__dirname, "public")));

// 获取post里面的参数
// 要使用use中间件通过bodyParser截取post的参数(json类型),并存储到了req.body中.
app.use(bodyParser.json({ extended: false }));

// 邮箱验证路由
app.get("/verifyEmailAdress", (req, res) => {
    // 模拟一个已经存在的邮箱
    const myEmail = "itheima@itcast.cn";
    // 获取get请求参数
    const { email } = req.query;
    // 进行对比
    if (email == myEmail) {
        // 已经存在,不能注册
        res.status(400).send({ message: '邮箱地址已经注册过了, 请更换其他邮箱地址' });
    } else {
        // 可以注册
        res.send({ message: '恭喜, 邮箱地址可用' });

    }
});

// 输入框文字提示
app.get('/searchAutoPrompt', (req, res) => {
    // 搜索关键字
    const key = req.query.key;
    // 提示文字列表
    const list = [
        '黑马程序员',
        '黑马程序员官网',
        '黑马程序员顺义校区',
        '黑马程序员学院报名系统',
        '传智播客',
        '传智博客前端与移动端开发',
        '传智播客大数据',
        '传智播客python',
        '传智播客java',
        '传智播客c++',
        '传智播客怎么样'
    ];
    // 搜索结果
    let result = list.filter(item => item.includes(key));
    // 将查询结果返回给客户端
    res.send(result);
});

// 获取省份
app.get('/province', (req, res) => {
    res.json([{
        id: '001',
        name: '黑龙江省'
    }, {
        id: '002',
        name: '四川省'
    }, {
        id: '003',
        name: '河北省'
    }, {
        id: '004',
        name: '江苏省'
    }]);
});

// 根据省份id获取城市
app.get('/cities', (req, res) => {
    // 获取省份id
    const id = req.query.id;
    // 城市信息
    const cities = {
            '001': [{
                id: '300',
                name: '哈尔滨市'
            }, {
                id: '301',
                name: '齐齐哈尔市'
            }, {
                id: '302',
                name: '牡丹江市'
            }, {
                id: '303',
                name: '佳木斯市'
            }],
            '002': [{
                id: '400',
                name: '成都市'
            }, {
                id: '401',
                name: '绵阳市'
            }, {
                id: '402',
                name: '德阳市'
            }, {
                id: '403',
                name: '攀枝花市'
            }],
            '003': [{
                id: '500',
                name: '石家庄市'
            }, {
                id: '501',
                name: '唐山市'
            }, {
                id: '502',
                name: '秦皇岛市'
            }, {
                id: '503',
                name: '邯郸市'
            }],
            '004': [{
                id: '600',
                name: '常州市'
            }, {
                id: '601',
                name: '徐州市'
            }, {
                id: '602',
                name: '南京市'
            }, {
                id: '603',
                name: '淮安市'
            }]
        }
        // 响应
    res.send(cities[id]);
});

// 根据城市id获取县城
app.get('/areas', (req, res) => {
    // 获取城市id
    const id = req.query.id;
    // 县城信息
    const areas = {
        '300': [{
            id: '20',
            name: '道里区',
        }, {
            id: '21',
            name: '南岗区'
        }, {
            id: '22',
            name: '平房区',
        }, {
            id: '23',
            name: '松北区'
        }],
        '301': [{
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
            id: '32',
            name: '富拉尔基区'
        }]
    };
    // 响应
    res.send(areas[id] || []);
});

// formData对象的使用
app.post("/formData", (req, res) => {
    // 因为body-Parser无法处理formData传递来的请求
    // 因此要使用另一个第三方模块处理formData传递来的请求
    // formidable的使用
    // 1. 创建对象
    let form = new formidable.IncomingForm();
    // 2. 处理post请求参数
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    });
});

// 二进制文件上传
app.post("/upload", (req, res) => {
    // formidable的使用
    // 1. 创建对象
    let form = new formidable.IncomingForm();
    // 配置文件保存的路径
    form.uploadDir = path.join(__dirname, "public", "uploads");
    // 保留文件扩展名
    form.keepExtensions = true;

    // 对上传的数据进行解析
    form.parse(req, (err, fields, files) => {
        // 获取文件客户端的地址,并进行截取
        // E:\AjaxTemplate\public\uploads\upload_0bf7f9731a250bdf057ac36ef8854334.png
        // console.log(files.myFile.path);

        // 对路径进行截取,并返回给客户端
        res.send({
            path: files.myFile.path.split("public")[1]
        });
    });
});

// $.ajax的基本使用
app.get("/base", (req, res) => {
    res.send({ name: "张三", age: 26 });
});

app.post("/base", (req, res) => {
    res.send({ name: "张三", age: 26 });
});

// $.ajax使用jsonp请求
// jsonp只能用get请求方式
app.get("/jsonp", (req, res) => {
    // res.jsonp():专门处理jsonp请求
    // res.jsonp({
    //     name: "老王",
    //     age: 26
    // });

    // jsonp属性案例
    const cb = req.query.cb
    data = cb + "({name: '老王',age: 26})";
    res.send(data);
});

// 查询所有任务
app.get("/todo/task", async(req, res) => {
    const task = await Task.find();
    res.send(task);
});

// 添加任务
app.post("/todo/addTask", async(req, res) => {
    const { title } = req.body;
    // 存入数据库
    // 创建任务实例
    const task = new Task({ title: title, completed: false });
    // 执行插入操作
    await task.save();
    res.send(task);
});

app.get("/todo/deleteTask", async(req, res) => {
    // 获取get参数
    const id = req.query.id;
    // 从数据库中删除这个数据
    const task = await Task.findByIdAndDelete({ _id: id });
    // 响应新的数据
    res.send(task);
});

app.post("/todo/modifyTask", async(req, res) => {
    // 更改数据库信息
    //findOneAndUpdate（）默认返回原始的数据
    //其中{_id: req.body._id}按id=req.body._id进行查询
    //其中{new: true}，需要将new属性设置为true，返回更新后的数据
    //其中_.pick（）为lodash模块中pick函数
    const task = await Task.findOneAndUpdate({ _id: req.body._id }, _.pick(req.body, ['title', 'completed']), { new: true });
    res.send(task);
});


// -------------------RESTful API
// 获取用户列表信息
app.get('/users', (req, res) => {
    res.send('当前是获取用户列表信息的路由');
});

// 获取某一个用户具体信息的路由
app.get('/users/:id', (req, res) => {
    // :id是占位符，需要用params对象获取
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前我们是在获取id为${id}用户信息`);
});

// 删除某一个用户
app.delete('/users/:id', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前我们是在删除id为${id}用户信息`);
});

// 修改某一个用户的信息
app.put('/users/:id', (req, res) => {
    // 获取客户端传递过来的用户id
    const id = req.params.id;
    res.send(`当前我们是在修改id为${id}用户信息`);
});

app.get('/xml', (req, res) => {
    res.header('content-type', 'text/xml');
    res.send('<message><title>消息标题</title><content>消息内容</content></message>')
});

// 监听端口
app.listen(3000);
console.log("服务器启动成功......");