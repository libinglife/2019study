const Router = require('koa-router');
const router = new Router();
const {
    checkUsername,
    register,
    doLogin,
    getPic
} = require('../controllers/user')
    // const db = require('../models/db');

router.use('*', async function(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Headers', 'Content-Type,Content-Length,Authorization, Accept, X-Requested-With , yourHeaderFeild')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    await next()
})

router.prefix('/user');

router.get('/register', async ctx => {

        await ctx.render('register')
    })
    .post('/check-username', checkUsername)
    .post('/register', register)
    .post('/login', doLogin)
    .get('/get-pic', getPic)
    .get('/login', async ctx => {
        await ctx.render('login')
    }).get('/logout', async ctx => {
        delete ctx.session.userInfo;
        // ctx.session.userInfo = null;
        ctx.redirect('/user/login');
    })

module.exports = router