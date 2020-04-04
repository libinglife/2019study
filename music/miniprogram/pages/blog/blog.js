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

    getBlogList() {
        wx.cloud.callFunction({
            name: 'blog',
            data: {
                $url: 'list'
            }
        }).then(res => {
            console.log(res);
            this.setData({
                blogList: res.result.data
            })

        }).catch(err => {
            console.log(err);

        })
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})