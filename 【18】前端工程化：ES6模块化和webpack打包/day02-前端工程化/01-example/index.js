// 导入1.js的数据
// m1变量名可以自己定义
// {}是按需导入,as可以起别名
import m1, { s1, s2 as temp, s3 } from "./01.js"
// 直接导入02.js,就直接执行了
import "./02.js"

console.log(m1);

console.log(s1);
// 如果起了别名,s2就会报错
// console.log(s2);
// temp是s2的别名
console.log(temp);
console.log(s3);

console.log("ok");