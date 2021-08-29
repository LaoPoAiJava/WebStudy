const express = require("express");
const fs = require("fs");
const promisfy = require("util").promisify;
const readFile = promisfy(fs.readFile);

const app = express();

app.get("/list", async(req, res, next) => {
    try {
        await readFile("./demo.txt");
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(3000);
console.log("服务器启动成功......");