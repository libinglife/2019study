let userInfo = {}

const db = wx.cloud.database()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        blogId: String,
        blog:Object
    },
    options: {
        // 组件样式可以享用外部样式
        styleIsolation: 'apply-shared',

    },
    /**
     * 组件的初始数据
     */
    data: {
        loginShow: false,
        // 底部弹出层是否显示
        modelShow: false,
        content: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {

        onComment() {
            wx.getSetting({
                success: (result) => {
                    if (result.authSetting["scope.userInfo"]) {
                        //订阅消息授权
                        wx.requestSubscribeMessage({
                            tmplIds: ['e2DE_OdIsq_Z8_5j5dbkk3cnJTmugSI4G21V-u4qTII'],
                            success(res) {

                            }
                        })

                        wx.getUserInfo({
                            timeout: 10000,
                            success: (result) => {
                                userInfo = result.userInfo

                                //显示评论弹出层
                                this.setData({
                                    modelShow: true
                                })
                            },
                            fail: () => {},
                            complete: () => {}
                        });


                    } else {
                        console.log("未授权")
                        this.setData({
                            loginShow: true
                        })

                        //订阅消息授权
                        wx.requestSubscribeMessage({
                            tmplIds: ['e2DE_OdIsq_Z8_5j5dbkk3cnJTmugSI4G21V-u4qTII'],
                            success(res) {

                            }
                        })
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        },
        onSuccessLogin(event) {

            console.log("成功授权", event)
            userInfo = event.detail


            //隐藏授权框
            this.setData({
                loginShow: false
            }, () => {
                //显示评论弹出层
                console.log("出现评论框")
                this.setData({
                    modelShow: true
                })
            })
        },
        onLoginError() {
            wx.showModel({
                title: "需要授权才可发表博客",
                mask: true,
            });
        },
        // 输入时获取内容
        onInput(event) {
            console.log(event)
            this.setData({
                content: event.detail.value
            })
        },
        // 发送评论
        onSend(event) {

            // console.log(event)

            let content = this.data.content
                // let formId = event.detail.formId
            const blogId = this.properties.blogId
            if (content.trim() == "") {
                wx.showModal({
                    title: '评论内容不能为空',
                    content: '',
                });
                return
            }
            wx.showLoading({
                title: "评论中",
                mask: true,
            });
            //1. 添加数据库
            db.collection('blog-comment').add({
                data: {
                    content,
                    createTime: db.serverDate(),
                    nickName: userInfo.nickName,
                    avatarUrl: userInfo.avatarUrl,
                    blogId: this.properties.blogId
                }
            }).then((res) => {
                console.log("插入成功")

                // 2.先获取用户订阅消息授权

                // 3.发送模板消息

                wx.getSetting({
                    withSubscriptions: true,
                    success: (res) => {
                        console.log(res)
                            //判断是否订阅
                        if (res.subscriptionsSetting && res.subscriptionsSetting['e2DE_OdIsq_Z8_5j5dbkk3cnJTmugSI4G21V-u4qTII'] == "accept") {
                            wx.cloud.callFunction({
                                name: "sendMessage",
                                data: {
                                    content,
                                    blogId
                                }
                            }).then(result => {
                                console.log(result)
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    },
                })

                wx.hideLoading()
                wx.showToast({
                    title: '评论成功',
                })
                this.setData({
                    modelShow: false,
                    content: '',
                })

                // 父元素刷新评论页面

                this.triggerEvent('refreshCommentList')

            }).catch(err => {
                console.log(err)
            })



        }
    }
})