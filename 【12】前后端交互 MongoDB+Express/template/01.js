const template = require("art-template");
const path = require("path");

let views = path.join(__dirname, "views", "01.art");

const html = template(views, {
    name: "老王",
    content: "<h1>我是H1标签</h1>"
});

console.log(html);