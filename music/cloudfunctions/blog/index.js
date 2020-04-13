// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')

const db = cloud.database()

const blogCollection = db.collection('blog')
const commentCollection = db.collection('blog-comment')

// 查询最大条数
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
    const app = new TcbRouter({ event })

    // 获取博客列表
    app.router('list', async (ctx, next) => {
        let { start, count } = event
        // console.log("start:", start)
        let blogList = await blogCollection.skip(start).limit(count)
            .orderBy("createTime", "desc").get()
        ctx.body = blogList
    })

    // 获取博客详情
    app.router('detail', async (ctx, next) => {
        let blogId = event.blogId
        console.log("博客id：",blogId)
        //具体博客
        let detail = await blogCollection.where({
            _id: blogId
        }).get()

        //评论查询
        const countResult = await commentCollection.count()
        const total = countResult.total
        console.log(countResult)

        let commentList = {
            data: []
        }
        if (total > 0) {
            const batchTimes = Math.ceil(total / MAX_LIMIT)
            const tasks = []
            for (let i = 0; i < batchTimes; i++) {
                let promise = commentCollection
                    .skip(i * MAX_LIMIT)
                    .limit(MAX_LIMIT).where({
                        blogId
                    }).orderBy('createTime', "desc").get()

                tasks.push(promise)
            }

            if(tasks.length>0){
                let tempList = await Promise.all(tasks)

                console.log(tempList)
                commentList = tempList.reduce((acc,cur)=>{
                    return {
                        data:acc.data.concat(cur.data)
                    }
                })
            }
        }

        ctx.body={
            commentList,
            detail
        }
    })


    return app.serve()
}