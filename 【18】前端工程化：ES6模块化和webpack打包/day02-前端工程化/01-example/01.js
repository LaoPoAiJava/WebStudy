let a = 1;
let b = "ok";
// c没有被导出,所以外界访问不到c
let c = true;

function d() {
    console.log(d);
}

// 导出
// 注意：每个模块中，只允许使用唯一的一次 export default，否则会报错！
export default {
    a,
    b,
    d
}

// 按需导出
export let s1 = "s1";
export let s2 = "s2";
export function s3() {
    console.log("s3");
}