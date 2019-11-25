// 服务端操作
const Koa = require('koa')
const Router = require('koa-router');
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');
const url = require('url');
const crypto = require('crypto');
const axios = require('axios');
const xmlParser = require('koa-xml-body');
const xml2js = require('xml2js');
const config = require('./config');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(static(__dirname + "/static/"));

// 验证
router.get('/wechat', cxt => {
    console.log("微信认证...", cxt.url);
    cxt.body = "你好"
})





app.use(router.routes()) //启动路由
app.use(router.allowedMethods());
app.listen(8989, () => {
    console.log("监听服务器地址：127.0.0.1:8989");
})