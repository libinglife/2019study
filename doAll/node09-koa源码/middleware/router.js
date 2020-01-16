class Router {
    constructor() {
        this.stack = []
    }
    register(...[path, method, ...callback]) {

        let route = { path, method, callback };
        this.stack.push(route)
    }

    // get(path, callBack) {
    //     this.register(path, 'get', callBack)
    // }

    // post(path, callBack) {
    //     this.register(path, 'post', callBack)
    // }


    get(...args) {
        const [path, ...fns] = [...args];

        // console.log("fns==>", fns);

        this.register(path, 'get', ...fns)
    }
    post(...args) {
        const [path, ...fns] = [...args];

        this.register(path, 'post', ...fns)
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
    routes() {
        let stack = this.stack;
        let route;
        return async(ctx, next) => {
            let { method, url } = ctx;

            stack.forEach((item, index) => {
                if (item.path == url && item.method == method) {
                    route = item.callback;
                    return;
                }
            })

            if (typeof route === "function") {
                route(ctx, next);
                return
            } else if (Array.isArray(route)) {
                console.log("这里执行多个函数")
                this.compose(ctx, route)
            }
            await next()
        }
    }
}

module.exports = Router