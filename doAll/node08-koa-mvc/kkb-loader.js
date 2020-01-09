const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 加载读取文件
function load(dir, cb) {

    url = path.resolve(__dirname, dir);
    const files = fs.readdirSync(dir);
    // console.log(files); //[ 'index.js', 'user.js' ]

    files.forEach(filename => {
        filename = filename.replace('.js', '');
        // const file = require(url + '/' + filename);

        // 导入文件
        const code = require(path.resolve(url, filename));
        cb(filename, code)
    })
}

// load('routes', (filename, code) => {
//     console.log("文件名字：" + filename);
//     console.log("文件code：", code);
// });

// 初始化 路由
function initRouter(app) {
    const router = new Router();

    load('routes', (filename, code) => {

        code = typeof code === 'function' ? code(app) : code;
        let preFix = filename == 'index' ? '' : `/${filename}`;

        Object.keys(code).forEach((key, index) => {
            const [method, path] = key.split(' ');
            console.log(preFix + `${path}`)
            router[method](preFix + `${path}`, code[key]);
        })
    });
    return router
}

// 初始化 控制器
function initController(app) {
    let controllers = {};
    load('controllers', (filename, code) => {
        controllers[filename] = code(app);
    });
    return controllers
}

// 初始化 服务器
function initServer(app) {
    let services = {};
    load('services', (filename, code) => {
        services[filename] = code(app);
    });
    return services
}

// 初始化 配置config;

const Sequelize = require('sequelize')

function initConfig(app) {
    load('config', (filename, config) => {
        app.$db = new Sequelize(config.db);
    })
}

// 初始化 配置模型 model;

function initModel(app) {
    app.$model = {};
    load('models', (filename, { schema, options }) => {
        app.$model[filename] = app.$db.define(filename, schema, options)
    });
    app.$db.sync()
}


module.exports = {
    initRouter,
    initController,
    initServer,
    initConfig,
    initModel
}