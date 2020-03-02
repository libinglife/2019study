const db = require('./db');

module.exports = {
    // 添加音乐
    addMusic: async(musicData) => {
        let val = Object.values(musicData);
        console.log("val:", val)
        return await db.q('insert into musicLists (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)', val);
    },

    // 删除音乐
    async delMusic(id) {
        return await db.q('delete from musicLists where id = ?', [id]);
    },
    //更新编辑音乐
    async upDateMusic(musicData) {
        let val = Object.values(musicData);
        return await db.q('update  musicLists set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id=?', val);
    },
    //根据用户Id 查询音乐
    async findMusicById(uid) {
        return await db.q('select * from musicLists where uid = ?', [uid]);
    }
}