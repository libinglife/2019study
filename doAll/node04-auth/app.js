const Koa = require('koa');

const session = require('koa-session');
const redis = require('redis');
const koaRedis = require('koa-redis')
const warper = require('co-redis');
const bodyParser = require('koa-bodyparser')

const redisClient = redis.createClient(6379, 'localhost');

const client = warper(redisClient);

const app = new Koa();
app.use(bodyParser())

app.keys = ["some keys"]

const session_config = {
        key: 'kkb',
        maxAge: 8640000,
        httpOnly: true,
        signed: true,
        store: koaRedis({ client }) //存储
    }
    // 中间件
app.use(session(session_config, app));

app.use((ctx) => {
    // 查看redis

    // console.log("redis:", redisClient)
    redisClient.keys('*', (err, data) => {
        console.log("data:", data);
        data.forEach((item, index) => {
            console.log("item:", item);
            redisClient.get(item, (err, res) => {
                if (err) return;
                console.log("名称：", res)
            })
        })
    })


    if (ctx.path === '/favicon.ico') return;

    console.log("ctx====>:", ctx.session)
    console.log("ctx.cookie====>:", ctx.cookies.get('kkb')) //获取对应的cookie 
    ctx.cookies.set('username', 'libing', { //设置cookie
        domain: 'localhost',
        path: '/', //cookie写入的路径
        maxAge: 1000 * 60 * 60 * 1,
        expires: new Date('2018-07-06'),
        httpOnly: false,
        overwrite: false
    });

    ctx.session.test = "测试哈哈"
    let n = ctx.session.count || 0;
    ctx.session.count = ++n;
    ctx.body = '第' + n + '次访问'
})

app.listen(3003, () => {
    console.log("监听服务----->3003");
})