let app = getApp();

let musicList = []; //歌曲列表
let nowPlayingIndex = 0; //正在播放歌曲索引

// 获取全局背景音乐管理器
// properties(Read only)(duration,currentTime,paused,buffered)
// properties(src(m4a, aac, mp3, wav),startTime,title,epname,singer,coverImgUrl,webUrl,protocol)
let backAudioManager = wx.getBackgroundAudioManager();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicInfo: {},
        isPlaying: false, // false表示不播放，true表示正在播放
        isSame: false, //是否点击相同的歌曲
        isShowLyric: false, //是否显示歌曲
        lyric: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        let {
            index,
            musicId
        } = options;

        musicList = wx.getStorageSync("musicList");
        nowPlayingIndex = index;
        this._loadDetailMusic(musicId)

    },

    // 加载具体音乐
    _loadDetailMusic(musicId) {

        // 判断是否是相同的歌曲
        if (musicId == app.globalData.playingMusicId) {
            this.setData({
                isSame: true
            })
            return
        }
        // 停止播放当前的音乐
        backAudioManager.stop();

        // 当前播放音乐信息
        const musicInfo = musicList[nowPlayingIndex];
        // console.log(musicInfo)

        this.setData({
            // musicInfo: musicInfo,
            picUrl: musicInfo.al.picUrl
        });

        // 设置全局播放id
        app.globalData.playingMusicId = musicId;
        // console.log("50:==>", app.globalData.playingMusicId)

        // 设置顶部标题
        wx.setNavigationBarTitle({
            title: musicInfo.name
        });

        // loading 
        wx.showLoading({
            title: "歌曲加载中",
            // mask: true
        });

        // 获取歌曲播放地址
        wx.cloud.callFunction({
            name: 'music',
            data: {
                musicId: musicId,
                $url: 'musicUrl'
            }
        }).then(res => {
            console.log(res);

            let playSrc = res.result.data[0].url;

            backAudioManager.src = playSrc;
            backAudioManager.title = musicInfo.name;
            backAudioManager.coverImgUrl = musicInfo.al.picUrl;
            backAudioManager.singer = musicInfo.ar[0].name;
            backAudioManager.epname = musicInfo.al.name; //专辑名

            this.onPlay();
            wx.hideLoading();

            // 获取歌词
            this._getLyric(musicId)

        }).catch(err => {
            console.log(err)
        });

    },

    // 获取歌词
    _getLyric(musicId) {
        wx.cloud.callFunction({
            name: 'music',
            data: {
                musicId: musicId,
                $url: 'lyric'
            }
        }).then(res => {
            console.log(res);

            this.setData({
                lyric: res.result.lrc.lyric
            })
        }).catch(err => {
            console.log()
        })
    },

    // 切换播放
    togglePlaying() {
        if (this.data.isPlaying) {
            backAudioManager.pause();
        } else {
            backAudioManager.play()
        }

        this.setData({
            isPlaying: !this.data.isPlaying
        })
    },

    // 上一首
    prev() {
        if (nowPlayingIndex == 0) {
            nowPlayingIndex = musicList.length - 1
        } else {
            nowPlayingIndex--
        }
        let musicId = musicList[nowPlayingIndex].id;
        this._loadDetailMusic(musicId)

    },
    next() {
        if (nowPlayingIndex == musicList.length - 1) {
            nowPlayingIndex = 0
        } else {
            nowPlayingIndex++
        }
        let musicId = musicList[nowPlayingIndex].id;
        this._loadDetailMusic(musicId)

    },


    // 开始播放
    onPlay() {
        this.setData({
            isPlaying: true
        })
    },
    // 暂停
    onPaused() {
        this.setData({
            isPlaying: false
        })
    },

    // 切换歌词
    toggleLyric() {
        this.setData({
            isShowLyric: !this.data.isShowLyric
        })
    },

    upDateLyric(event) {
        // 联动歌词
        this.selectComponent('.lyric').updateLyric(event);

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