// components/lyric/lyric.js

let lyricHeight = 0; //每行歌词的高度
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        lyric: String,
        isShowLyric: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        lyricList: [], // 歌词
        nowLyricIndex: 0, //当前选中的歌词索引
        scrollTop: 0, //滚动条的高度
    },

    observers: {

        // 监听歌词
        lyric(lrc) {
            console.log(lrc);
            if (lrc == "") {
                this.setData({
                    lrcList: [{
                        lrc: '暂无歌词',
                        time: 0,
                    }],
                    nowLyricIndex: -1
                })
            } else {

                this._formatLyric(lrc)
            }
        }
    },
    lifetimes: {
        ready() {
            // console.log("歌词组件");
            wx.getSystemInfo({
                success: (result) => {
                    // console.log(result)
                    lyricHeight = result.screenWidth / 750 * 64
                }
            });


        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        updateLyric(event) {

            let lrcList = this.data.lyricList;
            let currentTime = event.detail.currentTime;
            // console.log("currentTime:", parseInt(currentTime))
            if (lrcList.length == 0) {
                return
            }

            if (currentTime >= lrcList[lrcList.length - 1].time) {
                this.setData({
                    nowLyricIndex: (lrcList.length - 1),
                    scrollTop: (lrcList.length - 1) * lyricHeight
                });

                return
            }


            for (let i = 0, len = lrcList.length; i < len; i++) {
                // if (currentTime <= lrcList[i].time) {
                // console.log("lrcList:", parseInt(lrcList[i].time))
                if (parseInt(currentTime) == parseInt(lrcList[i].time)) {
                    this.setData({
                        nowLyricIndex: i,
                        scrollTop: (i) * lyricHeight
                    });
                    break
                }
            }
        },
        _formatLyric(lrc) {
            let tempObj = [];
            // "[00:00.000] 作曲 : G．Z光泽"
            let lines = lrc.split('\n');
            let r1 = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/; //匹配时间
            
            // let r2 = /([\u4E00-\u9FA5\\s]+)/ //匹配中文

            lines.forEach((item) => {
                let regResult = r1.exec(item);
                console.log(regResult)
                // let regLrc = r2.exec(item);

                if (regResult) {
                    let time = parseInt(regResult[1] * 60) + parseInt(regResult[2]) + parseInt(regResult[3]) / 1000;
                    let lrc = regResult[4];
                    lrc && tempObj.push({
                        time,
                        lrc
                    })
                }

            });
           
            this.setData({
                lyricList: tempObj
            })
        }
    }
})