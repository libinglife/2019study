(async() => {
    const { MongoClient } = require('mongodb');

    //创建客户端
    const client = new MongoClient("mongodb://localhost:27016", {

        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    //创建链接
    let ret = await client.connect();
    // console.log("ret:", ret);
    const db = client.db('study');
    const fruits = db.collection('fruits');

    // 添加文档
    ret = await fruits.insertOne({
        name: '苹果',
        price: 35
    });

    console.log("插入成功", JSON.stringify(ret, null, 2));

    //查询文档
    ret = await fruits.findOne();
    console.log("find:", JSON.stringify(ret, null, 2));

    // 更新文档
    ret = await fruits.updateOne({ name: '芒果' }, {
        $set: { name: '大芒果', price: 18 }
    });
    // ret = await fruits.updateMany({ name: '橘子' }, {
    //     $set: { name: '大苹果', price: 66 }
    // });
    console.log("更新:", JSON.stringify(ret, null, 2));

    // 删除文档
    // ret = fruits.deleteOne({ name: "大苹果" });

    // console.log("删除:", JSON.stringify(ret, null, 2));


    // ret = await fruits.deleteMany({ name: "芒果" });
    // ret = await fruits.deleteMany();
    // console.log("删除更多:", JSON.stringify(ret, null, 2));

    client.close();


})()