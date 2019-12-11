(async() => {
    // 1:N关系
    const Sequelize = require('sequelize');

    //建立链接
    const sequelize = new Sequelize('study', 'root', 'example', {
        host: 'localhost',
        port: '3307',
        dialect: 'mysql',
    });

    const Player = sequelize.define('player', {
        name: Sequelize.STRING
    }, {
        timestamps: false
    });
    const Team = sequelize.define('team', {
        name: Sequelize.STRING
    }, {
        timestamps: false
    });

    Player.belongsTo(Team); //1端建立关系

    Team.hasMany(Player); //N端建立关系

    // 同步数据库，force: true则会删除已存在表
    let ret = await sequelize.sync({ force: false });

    //创建队伍
    await Team.create({ name: '骑士' });
    //创建队员

    let teamRes = await Team.findAll();
    let lastId = teamRes.length;
    console.log("lastId:", lastId);
    await Player.bulkCreate([{
        name: '乐福',
        teamId: lastId,
    }, {
        name: 'TT汤普森',
        teamId: lastId
    }]);


    // 1端关联查询
    const players = await Player.findAll({ include: [Team] });

    console.log("players:", JSON.stringify(players, null, 2));

    // N端关联查询
    const team = await Team.findOne({
        where: { name: "骑士" },
        include: [Player]
    });

    console.log("team:", JSON.stringify(team, null, 2));

})();