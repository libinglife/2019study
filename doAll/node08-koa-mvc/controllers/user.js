module.exports = app => ({
    index: async ctx => {
        ctx.body = "user ctrl body"
    },
    detail: async ctx => {
        ctx.body = await app.$service.user.getFruits()
    }
})