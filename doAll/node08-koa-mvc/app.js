// const Koa = require('koa');
// const app = new Koa();
// const { initRouter } = require('./kkb-loader.js');

// const router = initRouter();

// app.use(router.routes());

// app.listen(3002, () => {
//     console.log("监听3002");
// })

// 自定义类

const Kob = require('./kkb');
const app = new Kob();

// const router = initRouter();

// app.use(router.routes());
app.listen(3002, () => {
    console.log("监听---->3002");
})