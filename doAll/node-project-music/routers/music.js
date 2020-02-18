const Router = require('koa-router');
const router = new Router();
const {
    addMusic
} = require('../controllers/music')

router.prefix('/music');

router.get('/index', async ctx => {
        await ctx.render('index')
    })
    .get('/add', async ctx => {
        await ctx.render('add')
    })
    .get('/edit', async ctx => {
        await ctx.render('edit')
    })
    .post('/add-music', addMusic)

module.exports = router