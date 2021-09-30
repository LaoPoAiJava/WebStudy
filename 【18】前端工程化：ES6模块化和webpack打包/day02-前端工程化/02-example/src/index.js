// 导入jquery
import $ from "jquery"
import "./css/1.css"
import "./css/1.less"
import "./css/1.scss"


// 入口函数
$(function() {
    $("li:odd").css("backgroundColor", "pink");
    $("li:even").css("backgroundColor", "skyblue");
});

class Person {
    static info = "abc";
}

console.log(Person.info);

// ------------------------------
// 导入Vue构造函数
import Vue from "vue"
// 导入App根组件
import App from "./components/App.vue"

const vm = new Vue({
    // 指定 vm 实例要控制的页面区域
    el: "#app",
    // 通过 render 函数，把指定的组件渲染到 el 区域中
    render: h => h(App)

});