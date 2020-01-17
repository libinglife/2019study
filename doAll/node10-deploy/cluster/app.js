const Koa = require('koa');
const app = new Koa();

app.use(async(ctx, next) => {

    // 产生随机错误
    Math.random() > 0.8 ? aaa() : '';

    await next();
    // ctx.type = "text/plain";
    ctx.body = "<h2>你好世界</h2>"
})

// console.log("module.parent:---->", module.parent);

if (!module.parent) {
    // console.log("parent为空：", module.parent)
    app.listen(3002, () => {
        console.log("服务监听3001");
    })
} else {
    // console.log("parent有值：", module.parent)

    module.exports = app
}