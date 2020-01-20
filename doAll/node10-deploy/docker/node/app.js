const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    Math.random() > 0.8 ? abc() : ''
    ctx.body = 'Hello Docker 创建自己的node 镜像 fff'
})
app.listen(3003, () => {
    console.log('app started at http://localhost:3000/')
})