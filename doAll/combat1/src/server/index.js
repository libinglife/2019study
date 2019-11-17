const Koa = require("koa")
const Router = require("koa-router");

// 生成令牌 、验证令牌
const jwt = require("jsonwebtoken");
const jwtAuth = require('koa-jwt');

// 数字签名的秘钥
const secret = "it's a secret hello";

const app = new Koa();
const router = new Router();

router.get("/api/login", async cxt => {
    const {
        username,
        password
    } = cxt.query;
    if (username == "李兵" && password == "123") {
        //生成令牌
        const token = jwt.sign({
            data: {
                name: "李兵"
            }, // 用户信息数据
            exp: Math.floor(Date.now() / 1000) + 60 * 60 //过期时间延长1小时
        }, secret)

        cxt.body = {
            code: 0,
            token
        }
    } else {
        cxt.status = 401;
        cxt.body = {
            code: 1,
            message: '用户名或者用户密码错误'
        }
    }
})

router.get("/api/userInfo",
    jwtAuth({
        secret
    }),
    async cxt => {
        cxt.body = {
            code: 0,
            data: {
                name: "李兵",
                age: 20
            }
        }
    }

)


app.use(router.routes())
app.listen(3000, () => {
    console.log("监听localhost:3000");

})