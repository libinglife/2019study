module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': []
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: false
        }
    },
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:3000/",
                    changeOrigin: true
                }
            },
            // before(app) {
            //     // 模拟后台服务器express

            //     app.get('/api/login', (req, res) => {
            //         const { username, password } = req.query;
            //         console.log(username, password);
            //         if (username == "李兵" && password == "123") {
            //             res.json({ code: 0, token: 'jiLei' });
            //         } else {
            //             res.status(401).json({ code: 1, message: "用户名或者密码错误" })
            //         }
            //     })
            // }
        },

    },

}