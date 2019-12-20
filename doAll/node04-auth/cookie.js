const http = require('http');

const session = {}


http.createServer((req, res) => {
    const sessionKey = "sid";
    if (req.url === '/favicon.ico') {
        return
    } else {
        const cookie = req.headers.cookie;
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            res.end("come Back");

            console.log('cookie:', JSON.stringify(req.headers.cookie, null, 2));

            // 简略写法未必具有通用性
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('session:', sid, session, session[sid])
        } else {
            const sid = (Math.random() * 1000000).toFixed();
            res.setHeader('Set-Cookie', `${sessionKey}=${sid}`);
            session[sid] = { name: '老铁' };

            console.log(session);
            res.end("hello cookie")
        }

    }
}).listen('3002', function() {
    console.log("监听成功3001");
})