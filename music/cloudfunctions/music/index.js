// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise')
const TcbRouter = require('tcb-router')
const BASE_URL = 'http://musicapi.xiecheng.live'
    // 云函数入口函数
exports.main = async(event, context) => {

    const app = new TcbRouter({ event });

    // 首页歌单列表
    app.router('playlist', async(ctx, next) => {
        const res = await cloud.database()
            .collection('playlist')
            .skip(event.start)
            .limit(event.count)
            .orderBy('createTime', 'desc')
            .get()

        ctx.body = res
    });

    // 获取歌单详情
    app.router('musiclist', async(ctx, next) => {
        let res = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId));

        ctx.body = JSON.parse(res);
    })


    return app.serve()

}