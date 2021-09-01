// 将数组转换成对象
// serializeArray():可以获取表单所有的值,返回一个数组
// [{ name: "email", value: "123@qq.com" },
//  { name: "password", value: "123456" }]
function serializeToJSON(form) {
    var result = {};
    var formArr = form.serializeArray();
    // 对这个数组遍历
    formArr.forEach(function(item) {
        result[item.name] = item.value;
    });
    return result;
}