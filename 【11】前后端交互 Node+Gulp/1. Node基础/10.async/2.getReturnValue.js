// 案例1:
function getData() {
    setTimeout(function() {
        return {
            msg: "hello noed.js"
        }
    }, 2000);
}

let msg = getData();
console.log(msg); // undefined

// 案例2:通过回调函数获取异步API的返回值
function getDataByCallBack(callback) {
    setTimeout(function() {
        callback({
            msg: "hello node.js"
        });
    }, 2000);
}

getDataByCallBack(function(result) {
    console.log(result);
});