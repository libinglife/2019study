(async() => {
    const mysql = require('mysql2/promise');

    //链接配置
    const cfg = {
        host: 'localhost',
        port: '3307', //默认是3306 不是的需要加端口
        user: 'root',
        password: 'example',
        database: 'study'
    }
    const connection = await mysql.createConnection(cfg);
    // console.log("connection", connection);

    let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS test(
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(45) NULL,
        PRIMARY KEY (id))
    `)

    console.log("create", ret)

    // 插入数据
    ret = await connection.execute(`
        INSERT INTO   test (message)   VALUES(?)
    `, ['12.10 mysql连接测试'])

    console.log('insert', ret)

    ret = await connection.execute(`
        SELECT * FROM  test
    `);

    console.log(JSON.stringify(ret[0]));
    connection.end();

})()