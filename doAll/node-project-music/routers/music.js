const Router = require('koa-router');
const router = new Router();
const {
    addMusic,
    delMusic,
    updateMusic,
    showIndex
} = require('../controllers/music')

router.prefix('/music');

router.get('/index', showIndex)
    .get('/add', async ctx => {
        await ctx.render('add')
    })
    .get('/edit', async ctx => {
        await ctx.render('edit')
    })
    .post('/add-music', addMusic)
    .delete('/del-music', delMusic)
    .put('/update-music', updateMusic)

module.exports = router