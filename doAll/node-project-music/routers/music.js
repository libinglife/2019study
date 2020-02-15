const Router = require('koa-router');
const router = new Router();

router.prefix('/music');

router.get('/index', async ctx => {
        await ctx.render('index')
    })
    .get('/add', async ctx => {
        await ctx.render('add')
    })
    .get('/edit', async ctx => {
        await ctx.render('edit')
    });

module.exports = router