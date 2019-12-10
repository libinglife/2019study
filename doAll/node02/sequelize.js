(async() => {
    const Sequelize = require("sequelize");
    // 建立链接
    const sequelize = new Sequelize("study", 'root', 'example', {
        host: 'localhost',
        port: "3307",
        dialect: 'mysql', //别名
        // operatorsAliases: false
    });
    console.log("链接成功");

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            get() {
                const fname = this.getDataValue('name');
                const price = this.getDataValue('price');
                const stock = this.getDataValue('stock');
                return `${fname}:(价格：￥${price} ,库存：${stock}kg)`
            }
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isFloat: { msg: '价格字段请输入数字' },
                min: { args: [0], msg: '价格字段必须大于0' }
            }
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        getterMethods: {
            amount() {
                return this.getDataValue('stock') + "kg";
            }
        },
        setterMethods: {
            amount(val) {
                const idx = val.indexOf('kg');
                const v = val.slice(0, idx);
                this.setDataValue('stock', v);
            }
        }
    });

    console.log("fruit:..", Fruit);

    Fruit.classify = function(name) {
        const tropicFruit = ['香蕉', '芒果', '椰子'];
        return tropicFruit.includes(name) ? "热带水果" : '其他水果';
    };

    Fruit.prototype.totalPrice = function(count) {
        return (this.price * count).toFixed(2);
    };

    ["香蕉", "草莓"].forEach(item => console.log(item + "是" + Fruit.classify(item)));

    //同步数据库 force:true 则会删除已存在的表
    let ret = await Fruit.sync({ force: false });
    console.log('sync:', ret);

    ret = await Fruit.create({
        name: '葡萄',
        price: 11.0,
        stock: 50
    })

    console.log("create", ret);

    // 使用实例方法
    Fruit.findAll().then(fruits => {
        const [f1] = fruits;
        console.log('f1:', f1);
        console.log(`买6kg${f1.name}需要花 ${f1.totalPrice(6)}`);

    });

    // 查找一个 若有多个符合 则选择第一个
    Fruit.findOne({ where: { name: '香蕉' } }).then(item => {
        console.log("findOne:", item);
        console.log(item.get())
    });

    // 查询第十个以后， 这是分页查询的基本操作
    Fruit.findAll({ offset: 10, limit: 2 }).then(fruits => {
        console.log('fruits:', fruits)
    })

    const Op = Sequelize.Op;
    console.log('Op:', Op);


    //条件查询
    Fruit.findAll({
        where: {
            price: {
                [Op.gt]: 4 //价格大于4
            },
            stock: {
                [Op.lte]: 50 //库存小于等于 50
            }
            // id: {
            //     [Op.lt]: 4,  // lt 是小于
            //     [Op.gt]: 2   // gt 是大于
            // }
        }
    }).then(result => {
        console.log("result:", JSON.stringify(result))
    })

    //数据库删除
    Fruit.destroy({
        where: {
            // id: 4
            name: '椰子'
        }
    }).then(res => {
        console.log("删除成功 res:", res)
    })



})()