const musicModels = require('../models/music');
const path = require('path');

// 上传歌曲文件
function optUpLoad(ctx) {
    // 获取文本信息
    let {
        title,
        singer,
        time
    } = ctx.request.body;
    // 获取歌曲文件
    let {
        file,
        filelrc
    } = ctx.request.files;

    console.log('file:', file)
    console.log("--------------");

    console.log('filelrc:', filelrc)


    // 整合文件
    let tempObj = {
        title,
        singer,
        time
    }

    // 歌词文件
    tempObj.filelrc = "no upload filelrc";
    if (filelrc) {
        const filelrcBase = path.parse(filelrc.path).base;
        tempObj.filelrc = path.resolve('/public/files', filelrcBase);
    }

    // 歌曲文件
    const fileBase = path.parse(file.path).base;
    tempObj.file = path.resolve('/public/files', fileBase);
    // 标识用户
    console.log("uid:", ctx.session.uid)
    tempObj.uid = ctx.session.uid;

    return tempObj;
}
module.exports = {
    // 渲染音乐首页
    async showIndex(ctx, next) {
        let id = ctx.session.uid;

        let musics = await musicModels.findMusicById(id);
        console.log(musics)
        await ctx.render('index', {
            musics
        })
    },
    /**
     *添加音乐
     *
     * @param {*} ctx
     * @param {*} next
     */
    async addMusic(ctx, next) {

        let tempObj = optUpLoad(ctx);

        try {
            let res = await musicModels.addMusic(tempObj);
            console.log("res", res);
            if (res.affectedRows > 0) {
                ctx.body = {
                    code: '001',
                    message: '添加成功'
                }
                return
            }
        } catch (error) {
            ctx.body = {
                code: '002',
                message: error.message
            }
        }

    },

    // 删除音乐
    async delMusic(ctx, next) {
        let {
            id
        } = ctx.request.body;
        let res = await musicModels.delMusic(id);
        if (res.affectedRows > 0) {
            ctx.body = {
                code: '001',
                message: '删除成功'
            }
            return;
        }

        ctx.body = {
            code: '001',
            message: '删除失败'
        }
    },
    //更新音乐
    async updateMusic(ctx, next) {
        let tempObj = optUpLoad(ctx);

        // 标识用户
        tempObj.id = ctx.request.body.id;

        try {
            let res = await musicModels.upDateMusic(tempObj);
            console.log("res", res);
            if (res.affectedRows > 0) {
                ctx.body = {
                    code: '001',
                    message: '更新成功'
                }
                return
            }
        } catch (error) {
            ctx.body = {
                code: '002',
                message: error.message
            }
        }
    }
}