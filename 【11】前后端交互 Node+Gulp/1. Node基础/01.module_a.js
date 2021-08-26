// 定义加法方法
const sum = (n1, n2) => n1 + n2;
const x = 100;

// 向模块外部导出数据
// exports.sum = sum;

// 向模块外部导出数据的另一种方式:module.exports
// module.exports.x = x;

module.exports = {
    name: "laowang"
}