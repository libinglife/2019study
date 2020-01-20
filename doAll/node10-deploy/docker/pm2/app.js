const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    Math.random() > 0.8 ? abc() : ''
    ctx.body = 'pm2 hello  Docker 镜像 '
})
app.listen(3005, () => {
    console.log('app started at http://localhost:3005/')
})