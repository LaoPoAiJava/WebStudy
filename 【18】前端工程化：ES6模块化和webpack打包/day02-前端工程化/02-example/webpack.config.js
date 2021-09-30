const path = require("path");
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 创建插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    // 指定要用到的模板文件
    template: "./src/index.html",
    // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
    filename: "index.html"
});
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    /*
        mode:用来指定构建模式
        mode的值有两种:
        1. development
        2. production
    */
    mode: "development",

    /*
        配置打包的入口与出口
        entry:配置入口
        output:配置出口

    */
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        // 出口的路径
        path: path.join(__dirname, "./dist"),
        // 输出的文件名
        filename: "bundle.js"
    },
    // plugins数组:是 webpack 打包期间会用到的一些插件列表
    plugins: [htmlPlugin, new VueLoaderPlugin()],
    /*
        所有第三方文件模块的匹配规则
        test 表示匹配的文件类型， use 表示对应要调用的 loader
        注意：
            1. use 数组中指定的 loader 顺序是固定的
            2. 多个 loader 的调用顺序是：从后往前调用
    */
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: ['url-loader?limit=16940'] },
            // exclude 为排除项，表示 babel-loader 不需要处理 node_modules 中的 js 文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    }
}