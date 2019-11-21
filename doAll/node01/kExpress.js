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
        })
    }
}