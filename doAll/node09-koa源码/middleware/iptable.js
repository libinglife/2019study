module.exports = () => async(ctx, next) => {
    const { req, res } = ctx;
    const blackList = ['127.0.0.2'];
    const ip = getClientIp(req);
    console.log("5", blackList.includes(ip))
    if (blackList.includes(ip)) {
        ctx.body = "not allowed"
    } else {
        await next()
    }
}

function getClientIp(req) {
    console.log('14-->', req.headers)
    console.log('15-->', req.connection.remoteAddress)
    console.log('16-->', req.socket.remoteAddress)
    return (
        req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress
    )
}