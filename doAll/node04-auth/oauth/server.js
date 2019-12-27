const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const querystring = require('querystring')



const axios = require('axios')
const config = {
    'client_id': '58c5def26e6c8eabd1d5',
    'client_secret': 'bea47aea1aa17c6e45524df1f7c318c9ecd77baf',
    'scope': ['user']
}
const app = new Koa()
const router = new Router()

app.use(static(__dirname + '/'));



router.get('/github/login', (ctx) => {

    // 重定向认证接口，
    let path = "https://github.com/login/oauth/authorize";
    path += "?client_id=" + config.client_id;
    path += "&scope=" + config.scope;

    ctx.redirect(path);
});

router.get('/github/callback', async(ctx) => {
    console.log("回调");
    console.log("code:", ctx.query.code);
    let code = ctx.query.code;
    let params = {
        'client_id': config.client_id,
        'client_secret': config.client_secret,
        'code': code
    }
    let res = await axios.post('https://github.com/login/oauth/access_token', params);

    console.log("返回token信息：", res.data);
    const { access_token } = querystring.parse(res.data);
    res = await axios.get('https://api.github.com/user?access_token=' + access_token);

    console.log("userinfo:", res.data);
    // ctx.body = {
    //     code: '1',
    //     message: '成功',
    //     userName: res.data.name,
    //     avatar: res.data.avatar_url
    // }
    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
    `
})

app.use(router.routes());
app.use(router.allowedMethods())

app.listen(3001, () => {
    console.log("监听-->localhost:3001");
})