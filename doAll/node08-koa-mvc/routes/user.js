// module.exports = {
//     'get /': async(ctx) => {
//         ctx.body = "用户"
//     },
//     'get /detail': ctx => {
//         ctx.body = "用户详情页面"
//     }
// }

// 第二种
// module.exports = app => ({
//     'get /': async(ctx) => {
//         // let name = "嘿嘿";
//         let name = await app.$service.user.getName();
//         // let name = await app.$model.Fruits.findOne();
//         // console.log(name)
//         ctx.body = "用户名：" + name
//     },
//     'get /detail': ctx => {
//         ctx.body = "用户详情页面 年龄:" + app.$service.user.getAge()
//     }
// })

// 第三种
module.exports = app => ({
    'get /': app.$ctrl.user.index,
    'get /detail': app.$ctrl.user.detail,
})