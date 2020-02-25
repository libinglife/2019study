const Router = require('koa-router');
const router = new Router();
const {
    checkUsername,
    register,
    doLogin,
    getPic
} = require('../controllers/user')
    // const db = require('../models/db');

router.prefix('/user');

router.get('/register', async ctx => {
        // let res = await db.q('insert into music (username, password ,email) values (?,?,?)', ['libing', '123', '163.com']);
        // console.log('res', res)
        await ctx.render('register')
    })
    .post('/check-username', checkUsername)
    .post('/register', register)
    .post('/login', doLogin)
    .get('/get-pic', getPic)
    .get('/login', async ctx => {
        await ctx.render('login')
    })

module.exports = router