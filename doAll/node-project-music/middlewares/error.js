module.exports = async(ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error)
        ctx.body = {
            code: '-001',
            message: error.message
        }
    }
}