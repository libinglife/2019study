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

load('routes', (filename, code) => {
    console.log("文件名字：" + filename);
    console.log("文件code：", code);
})