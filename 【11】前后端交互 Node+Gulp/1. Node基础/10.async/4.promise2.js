// 导入fs模块
const fs = require("fs");

function p1() {
    // 创建promise对象
    return new Promise((resolve, reject) => {
        fs.readFile("./1.txt", "utf-8", (error, result) => {
            if (error != null) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function p2() {
    // 创建promise对象
    return new Promise((resolve, reject) => {
        fs.readFile("./2.txt", "utf-8", (error, result) => {
            if (error != null) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

function p3() {
    // 创建promise对象
    return new Promise((resolve, reject) => {
        fs.readFile("./3.txt", "utf-8", (error, result) => {
            if (error != null) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

p1().then((result) => {
    console.log(result);
    return p2();
}).catch((error) => {
    console.log(error);
}).then((result) => {
    console.log(result);
    return p3();
}).catch((error) => {
    console.log(error);
}).then((result) => {
    console.log(result);
    return p3();
}).catch((error) => {
    console.log(error);
});