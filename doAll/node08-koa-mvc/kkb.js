const Koa = require('koa');
const { initRouter, initController, initServer, initConfig, initModel } = require('./kkb-loader.js');
class KKB {
    constructor(config) {
        this.$app = new Koa();

        initConfig(this);

        initModel(this);
        this.$ctrl = initController(this);

        this.$router = initRouter(this);
        this.$service = initServer(this);

        this.$app.use(this.$router.routes())
    }
    use(...args) {
        this.$app.use(...args)
    }
    listen(...args) {
        this.$app.listen(...args);
    }
}
module.exports = KKB