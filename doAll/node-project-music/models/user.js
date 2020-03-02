const db = require('./db');

module.exports = {
    // 查询用户
    findUsername: async(username) => {
        return await db.q('select * from users where username = ?', [username]);
    },
    //注册用户
    modelRegister: async(...params) => {
        console.log("params:", params);
        return await db.q('insert into users (username,password,email) values (?,?,?)', params);
    }
}