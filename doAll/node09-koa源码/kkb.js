const http = require('http');
const request = require('./request');
const context = require('./context');
const response = require('./response');

class kkb {
    constructor() {
        this.middleware = [] // 中间件
    }
    use(callBack) {
        this.middleware.push(callBack);
    }
    listen(...args) {
        http.createServer((req, res) => {
            // res.writeHead("200", { 'Content-Type': "text/html;charset=utf8" })
            res.setHeader('Content-type', 'text/html;charset=utf-8')

            let ctx = this.createContent(req, res);

            // this.callBack(ctx);

            this.compose(ctx, this.middleware);
            res.end(ctx.body)

        }).listen(...args);

        /*  const _this = this;
         http.createServer(function(req, res) {

             res.setHeader('Content-type', 'text/plain;charset=utf-8')

             // let ctx = this.createContent(req, res);
             // console.log(this); //这里指创建的服务server

             let ctx = {
                 get url() {
                     // console.log("上下文url-->", this)
                     // 这里的this 是指ctx对象
                     return this.request.url
                 }
             };

             ctx.request = {
                 get url() {
                     return this.req.url
                 }
             };
             ctx.request.req = req;


             _this.callBack(req, res, ctx);

         }).listen(...args); */

    }

    // 创建上下文
    createContent(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx
    }
    compose(ctx, middleware) {

        return dispatch(0)

        function dispatch(index) {
            const fn = middleware[index]
            if (!fn) {
                return Promise.resolve("结束了");
            }
            return Promise.resolve(fn(ctx, function next() {
                return dispatch(index + 1)
            }))
        }

    }
}

module.exports = kkb