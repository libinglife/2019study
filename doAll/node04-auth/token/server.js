const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
    // const jwtAuth = require('koa-jwt')

console.log("哈哈哈")
const jwtAuth = require('koa-jwt/lib/index')

const secret = "it is secret";

const app = new Koa()
const router = new Router()

app.use(static(__dirname + '/'));
app.use(bodyParser());

// app.use((ctx, next) => {
//     ctx.state.mane = "libing";
//     next()
// })

router.post('/login', (ctx) => {
    let { username, password } = ctx.request.body

    let token = jwt.sign({
        data: username,
        exp: Math.floor(Date.now() / 1000) + 3600
    }, secret);

    console.log("token:===>", token);
    ctx.body = {
        code: 1,
        message: 'login success',
        token: token
    }
})

// 获取用户信息 ，先验证
router.get('/getUser', jwtAuth({ secret }), (ctx) => {
    // 验证通过 数据存储在ctx.state 
    console.log("state:", ctx.state)

    ctx.body = {
        code: 1,
        message: 'get info success',
        user: ctx.state.user.data
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001, () => {
    console.log("监听 localhost:3001");
})