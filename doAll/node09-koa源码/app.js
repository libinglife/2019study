// 引入自己的kkb 库
const Koa = require('./kkb')
const path = require('path')
const app = new Koa();

const Router = require('./middleware/router')
const static = require('./middleware/static')
const logger = require('./middleware/logger')
const iptable = require('./middleware/iptable')

const router = new Router();

app.use(iptable())
app.use(static(path.resolve(__dirname, 'public')))
    // app.use(logger())

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



app.use(async(ctx, next) => {
    const { url } = ctx;
    if (url === "/favicon.ico") {
        return
    }
    // console.log("methods", ctx.method);
    await next()
        // console.log("next下面执行")
})

// app.use((ctx) => {
//     console.log("ctx.url----->", ctx.url);
//     ctx.body = "你好 koa22 源码";
//     ctx.body = ctx.body + " 创建上下文"
// })


router.get('/index', async(ctx, next) => {
    console.log("router url-->", ctx.url);
    ctx.body = "路由index页"
})

router.get('/user', async(ctx, next) => {
    console.log("user 中间件");
    ctx.body = "user 中间件";
    await next()
}, async(ctx, next) => {
    console.log("router url-->", ctx.url);
    ctx.body = ctx.body + "路由user页"
})

app.use(router.routes());

app.listen(3001, '127.0.0.1', () => {
    console.log("服务监听 3001")
})