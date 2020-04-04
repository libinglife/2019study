const Koa = require('koa')
const Router = require('koa-router');
const static = require('koa-static')
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const axios = require('axios');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(static(__dirname + "/static/"));

// --------------------微信授权-------------------

const OAuth = require('co-wechat-oauth');
const oauth = new OAuth(config.appId, config.appSecret);

// 生成用户URL
router.get('/wxAuthorize', async(cxt, next) => {
    console.log("cxt:", cxt);
    const state = cxt.query.id;
    console.log('state:', state);
    console.log('ctx...' + cxt.href);

    let redirectUrl = cxt.href;
    redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback');
    const scope = 'snsapi_userinfo';
    const url = oauth.getAuthorizeURL(redirectUrl, state, scope);
    console.log('url:', url);
    cxt.redirect(url)
})

// 用户回调方法
router.get('/wxCallback', async(cxt) => {

    const code = cxt.query.code;
    console.log("用户回调...", code);
    const token = await oauth.getAccessToken(code);
    console.log("token:", token);
    const accessToken = token.data.access_token;
    const openid = token.data.openid;
    console.log('openid:', openid)
    cxt.redirect('/?openid=' + openid);
})


// 获取用户信息
router.get('/getUser', async(cxt) => {
    const openid = cxt.query.openid;
    const userInfo = await oauth.getUser(openid);
    console.log('userInfo', userInfo);
    cxt.body = userInfo;
})



app.use(router.routes()) //启动路由
app.use(router.allowedMethods());
app.listen(4040, () => {
    console.log("监听服务器地址：127.0.0.1:4040");
})