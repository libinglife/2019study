const http = require('http');
const url = require('url');

let router = [];

class Application {
    get(path, handle) {
        router.push({
            path,
            method: "get",
            handle
        })
    }
    listen() {
        const server = http.createServer((req, res) => {
            const { pathname } = url.parse(req.url, true);

            for (const item of router) {
                const { path, method, handle } = item;
                if (pathname === path && req.method.toLowerCase() === method) {
                    return handle(req, res);
                }
            }

            // return router.find(v => pathname === v.path && req.method.toLowerCase() === v.method).handle(req, res);

        })

        server.listen(...arguments);
    }
}

module.exports = function() {
    return new Application()
}