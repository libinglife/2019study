// 引入自己的kkb 库
const Koa = require('./kkb')
const app = new Koa();

// app.use(async(ctx, next) => {
//     const { method, url, request } = ctx;
//     // console.log("ctx:", ctx);
//     // console.log("method:", method);
//     // console.log("url:", url);
//     // console.log("request:", request);
//     // console.log(ctx.response.body === ctx.body) true
//     // console.log(ctx.request.req === ctx.req)   true
//     ctx.body = "你好 Koa"
// });

// app.use((req, res) => {
//     res.end("你好 koa 源码")
// })

app.use((ctx) => {
    console.log("21----->", ctx.url);
    ctx.body = "你好 koa22 源码";
    ctx.body = ctx.body + " 创建上下文"
})

app.listen(3001, () => {
    console.log("服务监听 3001")
})