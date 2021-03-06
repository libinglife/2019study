// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const {OPENID} = cloud.getWXContext()
    
    try {
        const result = await cloud.openapi.subscribeMessage.send({
            touser: OPENID,
            page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
            lang: 'zh_CN',
            data: {
              thing2: {
                value: '评价完成'
              },
              thing3: {
                value: event.content
              },
             
            },
            templateId: 'e2DE_OdIsq_Z8_5j5dbkk3cnJTmugSI4G21V-u4qTII',
            // formId: event.formId
        })
        return result
    } catch (error) {
        console.log(error)
    }
}