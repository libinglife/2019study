const Koa = require('koa')
const Router = require('koa-router');
const static = require('koa-static')
const fs = require('fs');
const app = new Koa();
const router = new Router();

let str;
fs.readFile('../dist/index.html', "utf-8", (err, data) => {
    if (err) {
        ctx.body = "error found"
    }
    str = data.toString();
})

// 解决vue 路由在 history刷新 404情况
router.get('*', async(ctx, next) => {
    console.log("你好")
    if (ctx.url !== "/index.html") {
        console.log("在这里返回")
        ctx.body = str;
    } else {
        console.log("是index.html");
        ctx.body = str;
        await next();
    }
})

app.use(static("../dist/"));
app.use(router.routes()) //启动路由
app.use(router.allowedMethods());
// app.use(bodyParser());


app.listen(8989, () => {
    console.log("监听服务器地址：127.0.0.1:8989");
})