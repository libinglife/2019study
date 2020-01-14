const mysql = require('mysql');

//链接配置
const cfg = {
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'example',
    database: 'study'
}

//创建链接对象
const connection = mysql.createConnection(cfg);

//连接
connection.connect(err => {
    if (err) throw err;
    console.log("连接成功")
})

//创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test1(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id)
)`;
//插入
const INSERT_SQL = `INSERT INTO test1(message) VALUES(?)`;
//查询
const SELECT_SQL = `SELECT * FROM test1`;

// connection.query(CREATE_SQL, err => {
//     if (err) throw err;
//     //插入数据
//     console.log("创表成功");

// });

//执行插入数据
connection.query(INSERT_SQL, "你好 mysql 第三次", (err, result) => {
    if (err) throw err;
    console.log("insert", result);
});

// 查询数据库所有数据
// connection.query(SELECT_SQL, (err, result) => {
//     if (err) throw err;
//     console.log("select:", JSON.stringify(result));
//     connection.end();
// })

// 查询 id为2 或者 message = 老铁
connection.query(`select * from test1 where message = "老铁"`, (err, result) => {
    if (err) throw err;
    console.log("select:", JSON.stringify(result));
    connection.end();
})