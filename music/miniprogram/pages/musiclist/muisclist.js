// pages/musiclist/muisclist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listInfo: {},
        musiclist: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        wx.showLoading({
            title: "加载中"
        });
        wx.cloud.callFunction({
            name: 'music',
            data: {
                $url: 'musiclist',
                playlistId: options.playlistId
            }
        }).then(res => {
            console.log(res);
            const pl = res.result.playlist
            this.setData({
                listInfo: {
                    name: pl.name,
                    coverImgUrl: pl.coverImgUrl
                },
                musiclist: pl.tracks
            });

            this._setMusicList(pl.tracks)
            wx.hideLoading();
        }).catch(err => {
            console.log(err);
        })
    },

    // 存储本地音乐
    _setMusicList(val) {
        wx.setStorageSync("musicList", val);
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