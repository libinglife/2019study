module.exports = () => async(ctx, next) => {
    const { url } = ctx;
    if (url === "/favicon.ico") {
        return
    }
    const start = new Date().getTime();
    // console.log("start--->", start)
    await next();
    const end = new Date().getTime();
    console.log("耗时--->", end - start);
}