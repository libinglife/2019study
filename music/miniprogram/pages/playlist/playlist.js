// pages/playlist/playlist.js

const MAX_LIMIT = 15;
let flag = false;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperListUrls: [{
                url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
            },
            {
                url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
            },
            {
                url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
            }
        ],
        playlist: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this._getPlayList()
    },

    //获取播放列表
    _getPlayList() {
        if (flag) {
            return
        }
        wx.showLoading({
            title: "加载中",
            mask: true
        });
        wx.cloud.callFunction({
            name: 'music',
            data: {
                start: this.data.playlist.length,
                count: MAX_LIMIT,
                $url: 'playlist'
            }
        }).then(res => {
            // console.log(res);
            // 判断返回数据如果小于最大条数，后续不再请求
            if (res.result.data.length < MAX_LIMIT) {
                flag = true
            }
            this.setData({
                playlist: this.data.playlist.concat(res.result.data)
            });
            wx.hideLoading();
            wx.stopPullDownRefresh()

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
        // console.log("下拉刷新");
        this.setData({
            playlist: []
        });
        flag = false;
        this._getPlayList();

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // console.log("触底")
        this._getPlayList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})