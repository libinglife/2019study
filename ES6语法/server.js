/*
 * @version: 
 * @Author: 李兵
 * @Date: 2020-04-15 15:05:47
 * @LastEditTime: 2020-04-15 15:44:40
 */
let Koa = require('koa')
let Router = require('koa-router')
let app = new Koa();
let router = Router()

router.get('/get', async(ctx) => {
    const num = ctx.query.num;
    console.log(ctx.query)
    ctx.body = num
})

app.use(router.routes())
app.listen(3008, () => {
    console.log("启动在3008")
})