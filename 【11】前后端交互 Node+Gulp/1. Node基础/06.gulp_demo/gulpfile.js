/*
gulp的4个常用方法:
    gulp.src()：获取任务要处理的文件
    gulp.dest()：输出文件
    gulp.task()：建立gulp任务
    gulp.watch()：监控文件的变化
*/

// 引入gulp模块
const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// 建立gulp任务
// gulp.task(arg1,arg2);
// 参数1:任务的名称
// 参数2:回调函数
// gulp新版本报错:
// The following tasks did not complete: first
// Did you forget to signal async completion?
// 解决方案:done回调函数的作用是在task完成时通知Gulp
// gulp.task("first", done => {
//     console.log("哈喽,第一个gulp任务");
//     // 获取任务要处理的文件
//     gulp.src("./src/css/base.css")
//         .pipe(gulp.dest("./dist/css"));
//     done();
// });

// 案例1:
// 1. html压缩HTML任务
// 2. 抽取HTML文件中的公共代码
gulp.task("htmlmin", (cb) => {
    // 获取
    gulp.src("./src/*.html")
        // 公共文件包含
        .pipe(fileinclude())
        // 压缩HTML文件
        .pipe(htmlmin({ collapseWhitespace: true }))
        // 输出
        .pipe(gulp.dest("dist"));

    cb();
});

// 案例2:
// 1. 将less文件转化成css文件
// 2. 将css文件压缩
gulp.task("cssmin", cb => {
    // 获取
    gulp.src(["./src/css/*.less", "./src/css/*.css"])
        // less转换css
        .pipe(less())
        // 压缩css
        .pipe(csso())
        // 输出
        .pipe(gulp.dest("./dist/css"));
    cb();
});

// 案例3:js任务
// 1. ES6代码转换为ES5
// 2. 压缩js文件
// 创建任务
gulp.task("jsmin", cb => {
    // 获取
    gulp.src("./src/js/*.js")
        // 转换
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // 压缩
        .pipe(uglify())
        // 输出
        .pipe(gulp.dest("./dist/js"));
    cb();
});

// 案例4:复制文件夹
gulp.task("copy", cb => {
    // 获取
    gulp.src("./src/lib/*")
        .pipe(gulp.dest("./dist/lib"));

    gulp.src("./src/images/*")
        .pipe(gulp.dest("./dist/images"));
    cb();
});

// 构建任务
// Gulp 4中需要使用 gulp.series（顺序执行）和gulp.paralle（并行计算），
// 因为gulp任务现在只有两个参数，第二个参数必须为函数。所以将数组改为顺序执行函数
gulp.task("default", gulp.series(["htmlmin", "cssmin", "jsmin", "copy"]));