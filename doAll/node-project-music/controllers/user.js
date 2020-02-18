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

    },

    // 登录
    async doLogin(ctx, next) {
        let {
            username,
            password
        } = ctx.request.body;
        let users = await findUsername(username);

        // 1. 如果查询不到 提示用户或密码错误

        if (users.length == 0) {
            ctx.body = {
                code: '002',
                message: '用户名或密码错误'
            }
            return
        }

        // 2.如果查到 比对密码是否相同
        // 2.1 然后加入session 

        if (users[0].password == password) {
            ctx.body = {
                code: '001',
                message: '登录成功'
            };
            // 存入session
            ctx.session.userInfo = username;
            return
        }

        ctx.body = {
            code: '003',
            message: '用户名或密码错误'
        }
    }
}