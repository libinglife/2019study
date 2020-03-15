// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

const rp = require('request-promise')

// 首页列表接口地址
const URL = 'http://musicapi.xiecheng.live/personalized'

const playlistCollection = db.collection('playlist')

// 小程序在云函数中最多一次拉取100条数据 
const MAX_LIMIT = 10

// 云函数入口函数
exports.main = async(event, context) => {
    const result = await playlistCollection.count()
    console.log("条数:", result)
    const total = result.total
        // 向上取整需要拉取的数据的次数
    const batchTime = Math.ceil(total / MAX_LIMIT)

    const tasks = []
    for (let i = 0; i < batchTime; i++) {
        let p1 = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(p1)
    }
    let allList = {
        data: []
    }
    if (tasks.length > 0) {
        let resList = await Promise.all(tasks);
        allList = resList.reduce((acc, cur) => {
            return {
                data: acc.data.concat(cur.data)
            }
        })
    }


    // 请求第三方服务器的数据
    const playList = await rp(URL)

    let playlistJson = JSON.parse(playList).result

    let newData = []

    // 开始比较去重
    for (let i = 0; i < playlistJson.length; i++) {
        let flag = true
        for (let j = 0; j < allList.data.length; j++) {
            if (playlistJson[i].id == allList.data[j].id) {
                flag = false
                break
            }
        }
        if (flag) {
            newData.push(playlistJson[i])
        }
    }


    for (let i = 0, len = newData.length; i < len; i++) {

        await playlistCollection.add({
            data: {
                ...newData[i],
                createTime: db.serverDate()
            }
        }).then(res => {
            console.log("插入成功")
        }).catch(err => {
            console.log("插入失败")
        })

    }
    return newData.length;
}