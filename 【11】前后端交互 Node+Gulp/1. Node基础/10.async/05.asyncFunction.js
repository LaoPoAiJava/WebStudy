// 1.在函数定义的前面加上async关键字,就变成了异步函数
// 2.异步函数默认的返回值是promise对象
// 3.在异步函数内部使用throw关键字进行错误的抛出
// 
// await关键字
// 1.它只能出现在异步函数中
// 2.await promise 它可以暂停异步函数的执行 等待promise对象返回结果后再向下执行函数

// 案例1:
// 此函数返回的是promis对象
async function fun() {
    // throw代替了promise对象中的reject参数
    // 如果有了throw,return就不会执行了
    // throw "发生了错误";

    // return代替了promise对象中的resolve参数
    return "老王";
}

// console.log(fun()); // Promise { '老王' }

// 因为返回的是promise对象，那么就可以使用then()和catch()
fun().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

// 案例2:
// 定义3个异步函数
async function p1() {
    return "p1";
}

async function p2() {
    return "p2";
}

async function p3() {
    return "p3";
}

// 定义1个执行异步函数的函数
async function run() {
    // 异步函数前面加了await关键字后,只有当第一个异步函数执行完成以后才执行下一个异步函数。
    let r1 = await p1();
    let r2 = await p2();
    let r3 = await p3();
    console.log(r1);
    console.log(r2);
    console.log(r3);
}

run();