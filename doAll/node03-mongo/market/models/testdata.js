const mongodb = require('./db.js');

console.log("fff:", mongodb);

mongodb.once('connect', async() => {
    console.log("connect成功");

    const col = mongodb.col('fruits');

    try {
        // 先删除全部
        // await col.deleteMany();
        //在插入
        await col.insertMany([{ name: "苹果", price: 5, category: "水果" },
            { name: "香蕉", price: 3.5, category: "水果" },
            { name: "芒果", price: 15, category: "水果" },
            { name: "砂糖橘", price: 8, category: "水果" },
            { name: "土豆", price: 2, category: "蔬菜" },
            { name: "西红柿", price: 3, category: "蔬菜" },
            { name: "茄子", price: 4, category: "蔬菜" },
            { name: "韭菜", price: 5, category: "蔬菜" },
            { name: "牛肉", price: 30, category: "生鲜" },
            { name: "鱼", price: 12, category: "生鲜" },
            { name: "大闸蟹", price: 99, category: "生鲜" },
            { name: "鲜虾", price: 20, category: "生鲜" }
        ], (res => {
            console.log("res:", res);
        }));

        let ret = await col.find({ price: { $gt: 10 } }).toArray();
        console.log("ret:", ret)


    } catch (error) {
        console.log("插入测试数据失败");
        console.log(error);
    }
})