const {
    findUsername,
    modelRegister
} = require('../models/user')

module.exports = {
    // 校验用户是否存在
    checkUsername: async(ctx, next) => {
        let {
            username
        } = ctx.request.body;

        let res = await findUsername(username);
        console.log(res);
        if (res.length == 0) {
            ctx.body = {
                code: '001',
                message: '可以注册'
            }
            return
        }
        ctx.body = {
            code: '002',
            message: '用户名已经存在'
        }
    },
    // 注册用户
    register: async(ctx, next) => {
        let {
            username,
            password,
            email,
            v_code
        } = ctx.request.body;

        // 先判断名字是否可用
        let res1 = await findUsername(username);
        console.log(res1);
        if (res1.length != 0) {
            ctx.body = {
                code: '002',
                message: '用户名已经存在'
            }
            return
        }

        //捕捉异常错误 
        try {
            // 开始注册用户逻辑
            let res = await modelRegister(username, password, email);
            console.log(res);
            if (res.affectedRows > 0) {
                ctx.body = {
                    code: '001',
                    msg: '注册成功'
                }
                return;
            }
            ctx.body = {
                code: '002',
                msg: result.message
            }
        } catch (error) {
            ctx.throw('002')
        }

    }
}