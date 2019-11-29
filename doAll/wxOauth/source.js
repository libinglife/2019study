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

// app.use(bodyParser());
app.use(static(__dirname + "/static/"));
app.use(xmlParser())

// 验证
router.get('/wechat', cxt => {
    console.log("微信认证...", cxt.url);

    console.log(url.parse(cxt.url, true));

    const { query } = url.parse(cxt.url, true);

    const {
        signature, //微信加密签名，signature 结合开发者填写的token 和请求中的timestamp参数 ,nonce参数
        timestamp, //时间戳
        nonce, //随机数
        echostr //随机数
    } = query;
    console.log('wechat', query);

    //将 token timestamp nonce 三个参数进行字典排序 并用sha1加密

    let str = [config.token, timestamp, nonce].sort().join('');
    console.log('str:', str);
    let strSha1 = crypto.createHash('sha1').update(str).digest('hex');
    console.log(`自己加密后的字符串为：${strSha1}`);

    //签名对比 相同则按微信要求返回 echostr 参数
    if (signature === strSha1) {
        cxt.body = echostr
    } else {
        cxt.body = "你不是微信"
    }
})

//接受信息
router.post('/wechat', cxt => {

    console.log("post信息:", cxt);

    const {
        xml: msg
    } = cxt.request.body;

    console.log("receive msgs:", msg);

    const builder = new xml2js.Builder();
    const result = builder.buildObject({
        xml: {
            ToUserName: msg.FromUserName,
            FromUserName: msg.ToUserName,
            CreateTime: Date.now(),
            MsgType: msg.MsgType,
            Content: "消息：hello " + msg.Content
        }
    })
    console.log('xml result:', result);

    cxt.body = result;

})

router.get("/test", async(cxt) => {
    console.log("进入测试");

    let url = "http://huodong.renren.com/common/happyrecallscratch/recharge?rechargeStatus=success&selectTab=2&selectNum=2&userId=967966122";
    cxt.redirect(url)
})



app.use(router.routes()) //启动路由
app.use(router.allowedMethods());
app.listen(8989, () => {
    console.log("监听服务器地址：127.0.0.1:8989");
})