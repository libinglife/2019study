const Koa = require('koa');
const koaRouter = require('koa-router');

const session = require('koa-session');
const bodyParse = require('koa-bodyparser');
const static = require('koa-static');

const app = new Koa();
const router = new koaRouter();
app.keys = ["this is keys"];

app.use(static(__dirname + "/"));
app.use(bodyParse());
app.use(session({ key: 'defineKey', signed: true }, app));

app.use((ctx, next) => {
    if (ctx.url.indexOf('/login') > -1) {
        next()
    } else {
        console.log("session:--->", ctx.session);

        if (!ctx.session.userInfo) {
            ctx.body = {
                message: 'fail login'
            }
        } else {
            next()
        }
    }
})


let userFrom = [{
    username: 'lb',
    password: "123456"
}]

// 登录
router.post('/login', (ctx, next) => {
    let { username, password } = ctx.request.body;
    console.log('username=====>', username);
    console.log('password=====>', password);

    ctx.session.userInfo = username;
    ctx.body = {
        code: 1,
        message: 'success login'
    }
});


// 获取用户信息
router.get('/getUser', (ctx) => {

    console.log("state:", ctx.state)
    ctx.body = {
        code: 1,
        message: ctx.session.userInfo
    }
})


// 退出登录


router.post('/logout', (ctx) => {
    // ctx.session.userInfo = null;
    delete ctx.session.userInfo;
    ctx.body = {
        code: 1,
        message: 'log out success'
    }
})

app.use(router.routes());
app.use(router.allowedMethods())
app.listen(3001, () => {
    console.log("监听localhost:3001");
})