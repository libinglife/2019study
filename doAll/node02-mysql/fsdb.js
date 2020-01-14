//本地文件存储形式
const fs = require('fs');

//获取
function get(key) {
    fs.readFile('./db.json', (err, data) => {
        if (err) throw err;
        data = data.toString();
        let json = data ? JSON.parse(data) : {};
        // const json = JSON.parse(data);

        console.log(json[key]);
    })
}

// 设置
function set(key, value) {
    fs.readFile('./db.json', (err, data) => {
        if (err) throw err;
        data = data.toString();
        const json = data ? JSON.parse(data) : {};
        // result = result ? result : {};

        json[key] = value; //设置值

        fs.writeFile('./db.json', JSON.stringify(json), (err, data) => {
            if (err) throw err;
            console.log('写入成功', "data:", data);
        })
    })
}
//命令行接口部分
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const [op, key, val] = input.split(" ");
    if (op === "get") {
        get(key)
    } else if (op === "set") {
        set(key, val);
    } else if (op === 'quit') {
        rl.close()
    } else {
        console.log("没有该操作");
    }
});

rl.on('close', function() {
    console.log('程序结束');
    process.exit(0);
})