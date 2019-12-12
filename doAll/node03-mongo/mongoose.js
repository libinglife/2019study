const mongoose = require('mongoose');

// 1连接
mongoose.connect('mongodb://localhost:27016/study', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on('error', () => {
    console.log("连接数据库失败");
});

connection.once('open', async() => {
    //2. 定义一个schema 模型 -》 table
    const Schema = mongoose.Schema({
        category: String,
        name: String,
        price: Number
    });

    // 3.编译一个Model,他对应数据库中的复数、小数的collection

    const Model = mongoose.model('meat', Schema);

    try {
        // 4. 创建 create返回promise
        let ret = await Model.create({
            category: "热带水果",
            name: "香蕉",
            price: 6.7
        });

        console.log("插入水果:", ret);

        // 5.查询 find 返回Query 它实现了then和catch，可以当Promise使用
        // ret = await Model.find({ name: '苹果' });
        ret = await Model.findOne({ name: '香蕉' })

        console.log("查询水果:", ret);

        // 6.更新 updateOne
        // ret = await Model.update({ name: '苹果' }, { $set: { price: 33 } });
        ret = await Model.updateMany({ name: '香蕉' }, { $set: { price: 21 } });

        console.log("更新水果:", ret);

        // 7.删除 deleteOne
        ret = await Model.deleteOne({ price: 5 });

        console.log("删除结果：", ret);

        // 关闭
        connection.close();

    } catch (error) {
        console.log(error);
    }







})