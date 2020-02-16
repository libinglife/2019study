const db = require('./db');

module.exports = {
    // 查询用户
    findUsername: async(username) => {
        return await db.q('select * from music where username = ?', [username]);
    },
    //注册用户
    modelRegister: async(...params) => {
        console.log("params:", params);
        return await db.q('insert into music (username,password,email) values (?,?,?)', params);
    }
}