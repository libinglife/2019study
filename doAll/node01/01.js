const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    const { url, method, headers } = request

    if (url === '/' && method === 'GET') {
        fs.readFile('MP_verify_FPmfzecPoCOhuOkA.txt', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/pain;charset=utf-8' })
                response.end('服务器错误')
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/txt')
            response.end(data.toString())
        })
    } else if (url === '/MP_verify_FPmfzecPoCOhuO.txt' && method === 'GET') {
        fs.readFile('MP_verify_FPmfzecPoCOhuOkA.txt', (err, data) => {
            console.log(data);

            // if (err) {
            //     response.writeHead(500, { 'Content-Type': 'text/pain;charset=utf-8' })
            //     response.end('服务器错误')
            // }
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/txt')
            response.end(data.toString())
        })
    } else {
        response.end('a response...')
    }

    // response.end('a response...')
})
server.listen(8989, function() {
    // ngrok 隧道代理 http://qwe.free.idcfengye.com
    console.log("启动监听---->127.0.0.1:8989");

})