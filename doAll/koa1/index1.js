const koa = require('koa');
const app = new koa();

// 中间件1 响应时间中间件输出
app.use(async(ctx, next) => {

    console.log("中间件1");
    await next();

    console.log('中间件1 next after');
    const rt = ctx.response.get('x-response-time');
    console.log(`输出计时：${ctx.method} ${ctx.url}-${rt}`);

})

// 中间2 响应时间统计中间件
app.use(async(ctx, next) => {
    console.log("中间件2");
    const start = Date.now();
    console.log("计时开始");
    await next();
    console.log('中间件2 next after');
    const ms = Date.now() - start;
    ctx.set('x-response-time', `${ms}ms`);
    console.log("计时结束");

})

app.use(async(ctx, next) => {
    console.log('响应用户请求');
    ctx.status = 200; //设置响应状态码
    ctx.type = "html" //等效于 ctx.set("Content-type",'text/html');
    ctx.body = "<h1>你好中间件</h1>"
})

app.listen(3000, () => {
    console.log("监听127.0.0.1:3000");
})