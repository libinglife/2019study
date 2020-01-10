const Koa = require('koa');
const { initRouter, initController, initServer, initConfig, initModel, initSchedule } = require('./kkb-loader.js');
class KKB {
    constructor(config) {
        this.$app = new Koa();

        initConfig(this);

        initModel(this);
        this.$ctrl = initController(this);

        this.$router = initRouter(this);
        this.$service = initServer(this);

        this.$app.use(this.$router.routes());

        // 初始化定时任务
        // initSchedule();
    }
    use(...args) {
        this.$app.use(...args)
    }
    listen(...args) {
        this.$app.listen(...args);
    }
}
module.exports = KKB