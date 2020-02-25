const db = require('./db');

module.exports = {
    // 添加音乐
    addMusic: async(musicData) => {
        let val = Object.values(musicData);
        console.log("val:", val)
        return await db.q('insert into musics (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)', val);
    },

    // 删除音乐
    async delMusic(id) {
        return await db.q('delete from musics where id = ?', [id]);
    },
    //upDateMusic
    async upDateMusic(musicData) {
        let val = Object.values(musicData);
        return await db.q('update  musics set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id=?', val);
    }
}