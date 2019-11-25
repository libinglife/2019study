const fs = require('fs');
// const data = fs.readFile('./index.html', (err, data) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log(data.toString());

// })

// async 方式
(async() => {
    //转化为async 方式
    const { promisify } = require("util");

    const readFile = promisify(fs.readFile);

    try {
        const data = await readFile('./index.html');
        console.log("你好");

        console.log(data.toString());
    } catch (error) {
        console.log("error", error);

    }

})();


process.on('exit', (code) => {
    console.log(`退出码：${code}`);
})

process.on('error', (code) => {
    console.log("error:${code}");
})