const Router = require('koa-router');
const router = new Router();
const { appPort } = require('../config')
const {
    checkUsername,
    register,
    doLogin,
    getPic
} = require('../controllers/user')
    // const db = require('../models/db');


router.prefix('/user');

router.get('/register', async ctx => {

        await ctx.render('register')
    })
    .post('/check-username', checkUsername)
    .post('/register', register)
    .post('/login', doLogin)
    .get('/get-pic', getPic)
    .get('/login', async ctx => {
        await ctx.render('login', {
            host: `127.0.0.1:${appPort}`
        })
    }).get('/logout', async ctx => {
        delete ctx.session.userInfo;
        // ctx.session.userInfo = null;
        ctx.redirect('/user/login');
    })

module.exports = router