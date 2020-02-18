module.exports = {
    async addMusic(ctx, next) {
        const {
            title,
            singer,
            time
        } = ctx.request.body;

        console.log(ctx.request.body);
        console.log("----------------------")
        console.log(ctx.request.files);

        ctx.body = {
            code: '001',
            message: '添加成功'
        }

    }
}