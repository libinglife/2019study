// pages/blog/blog.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        modelShow: false, //显示授权框
        blogList: [], //博客数据
    },

    // 发布按钮
    publish() {
        wx.getSetting({
            success: (result) => {
                console.log(result);
                if (result.authSetting["scope.userInfo"]) {
                    wx.getUserInfo({
                        timeout: 10000,
                        success: (result) => {
                            // console.log(result)
                            this.onSuccessLogin({
                                detail: result.userInfo
                            })
                        },
                        fail: () => {},
                        complete: () => {}
                    });
                } else {
                    this.setData({
                        modelShow: true
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });
    },

    // 成功授权
    onSuccessLogin(event) {
        // console.log("event:==>", event);
        let userInfo = event.detail;
        wx.navigateTo({
            url: `../blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`,
        });

    },
    // 拒绝授权
    onErrorLogin() {
        wx.showToast({
            title: '授权用户才可发布',
            icon: 'none',
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBlogList();
    },


    // 获取博客列表
    getBlogList(start = 0) {

        wx.showLoading({
            title: "努力加载中",
            mask: true,
        });
        wx.cloud.callFunction({
            name: 'blog',
            data: {
                $url: 'list',
                start,
                count: 4
            }
        }).then(res => {
            console.log(res);
            this.setData({
                blogList: this.data.blogList.concat(res.result.data)
            })

            wx.hideLoading();
            // 停止下拉刷新的状态
            wx.stopPullDownRefresh()


        }).catch(err => {
            console.log(err);

        })
    },


    // 跳转博客评论页
    goBlogComment(event) {
        console.log(event)
        const blogId= event.target.dataset.blogid
        wx.navigateTo({
            url: '../blog-comment/blog-comment?blogId='+blogId,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.data.blogList = []
        this.getBlogList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        let start = this.data.blogList.length
        this.getBlogList(start)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(event) {
        console.log(event);
        let blog=event.target.dataset.blog
        return {
            title:blog.content,
            path:`/pages/blog-comment/blog-comment?blogId=${blog._id}`,
            imageUrl:blog.img[0]
        }
    }
})