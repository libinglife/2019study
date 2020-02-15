const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'example',
    database: 'study'
})

let db = {};
db.q = function(sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            connection.query(sql, params, (error, result) => {
                if (error) {
                    reject(error);
                }
                console.log(sql, params);
                resolve(result);
            })
        })
    })
}

module.exports = db;