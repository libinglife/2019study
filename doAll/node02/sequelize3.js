(async() => {
    const Sequelize = require('sequelize');

    const sequelize = new Sequelize('study', 'root', 'example', {
        host: 'localhost',
        port: '3307',
        dialect: 'mysql'
    });

    const Fruit = sequelize.define('myfruit', {
        name: Sequelize.STRING
    }, {
        timestamps: false
    });
    const Category = sequelize.define('category', {
        name: Sequelize.STRING
    }, {
        timestamps: false
    });

    Fruit.FruitCategory = Fruit.belongsToMany(Category, {
        through: 'FruitCategory'
    });


    // 插入测试数据
    let ret = sequelize.sync({ force: false });

    await Fruit.create({
        name: '香蕉4',
        // categories: [{ id: 1, name: '热带' }, { id: 2, name: '温带' }]
    }, {
        include: [Fruit.FruitCategory]
    });
    console.log("插入成功");

    const fruit = await Fruit.findOne({
        where: { name: '香蕉1' },
        include: [{ model: Category, through: { attributes: ['id', 'name'] } }]
    });

    console.log("fruit:", JSON.stringify(fruit, null, 2));

})();