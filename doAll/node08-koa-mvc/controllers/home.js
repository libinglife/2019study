module.exports = app => ({
    index: async ctx => {
        ctx.body = "ctrl body"
    },
    detail: async ctx => {
        ctx.body = await app.$service.index.getPlayer()
    }
})