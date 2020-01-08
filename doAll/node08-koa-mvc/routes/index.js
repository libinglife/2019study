module.exports = {
    'get /': async(ctx) => {
        ctx.body = "首页"
    },
    'get /detail': ctx => {
        ctx.body = "首页详情页面"
    }
}