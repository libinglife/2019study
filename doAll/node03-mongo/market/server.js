const express = require('express');

const app = express();

const path = require('path');

// const testData = require('./models/testdata.js');
const mongodb = require('./models/db');


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});


app.get('/api/list', async(req, res) => {
    //分页查询
    // console.log("req:", req)
    const page = +req.query.page; // +号是为了转化为 number 类型

    const col = mongodb.col('fruits');

    let limit = 9;
    let result = await col.find().skip((page - 1) * limit).limit(limit).toArray();
    console.log('result:', result);
    let total = await col.find().count();
    res.json({
        code: '1',
        msg: '成功',
        data: result,
        total: total,
        size: limit
    })
})

app.listen("3001", function(param) {
    console.log("监听服务=======>127.0.0.1:3000")
})