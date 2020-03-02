const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const render = require('koa-art-template');
const bodyParse = require('koa-bodyparser');
const errors = require('./middlewares/error');
const session = require('koa-session');
const formidable = require('koa-formidable');

const app = new Koa();
// 监听
app.listen(3001, () => {
    console.log("服务启动:localhost:3001")
});

app.keys = ["test"];
app.use(session({
    key: 'defineKey',
    sign: true
}, app))


// 引入路由
const userRouter = require('./routers/user')
const musicRouter = require('./routers/music')

//模板渲染
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

//捕捉错误

app.use(errors);

// 重写URL,改掉/public
app.use(async(ctx, next) => {
    if (ctx.request.url.startsWith("/public")) {
        ctx.url = ctx.url.replace('/public', '')
    }
    await next()
})

// 使用中间件开始
app.use(static(path.resolve('./public')));
// app.use(bodyParse())

// 权限控制
app.use(async(ctx, next) => {
    // console.log(ctx.url);
    // console.log("userInfo", ctx.session.userInfo)
    if (ctx.url.startsWith("/music")) {

        if (ctx.session.userInfo) {
            await next();
            return;
        } else {
            ctx.body = `
                <div>
                   暂未登录，<a href="/user/login">请去登录</a>
                </div>
            `
            return
        }
    }
    await next()
})

// 必须在每次请求挂载新的数据与视图的桥梁(在session之后)
app.use(async(ctx, next) => {
    // express app.locals 视图与数据的桥梁
    ctx.state.user = ctx.session.userInfo;
    console.log("session:====>", ctx.session)
    await next()
})


// 上传文件
app.use(formidable({
    uploadDir: path.resolve('./public/files'),
    keepExtensions: true,
}))

// 使用中间件结束


// 路由开始
app.use(userRouter.routes());
app.use(musicRouter.routes());
app.use(userRouter.allowedMethods());
// 路由结束