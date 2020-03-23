// properties(Read only)(duration,currentTime,paused,buffered)
// properties(src(m4a, aac, mp3, wav),startTime,title,epname,singer,coverImgUrl,webUrl,protocol)
const backAudioManager = wx.getBackgroundAudioManager();

let movableAreaWidth = 0;
let movableViewWidth = 0;

let duration = ''; //音乐总时长

let currentSec = -1; // 当前播放秒数，防止一秒内刷新四次

let isMoving = false; //是否手指滑动进度条
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isSame: Boolean
    },

    lifetimes: {
        ready() {
            if (this.properties.isSame) {
                this._setTime();
            }
            // this._setTime();
            this._getMovableViewWidth();
            this._bindEvent();
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTime: '00:00',
        totalTime: '00:00',
        movableDis: 0, // 移动的距离
        process: 0, // 进度条
    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 滑动改变
        onChange(e) {
            // console.log("change")
            if (e.detail.source == "touch") {
                let x = e.detail.x;
                this.data.process = x / (movableAreaWidth - movableViewWidth) * 100;
                this.data.movableDis = x;

                isMoving = true; //改变move状态
            }
        },

        //滑动结束
        onTouchend(e) {
            this.setData({
                process: this.data.process,
                movableDis: this.data.movableDis
            });

            let sec = (this.data.process * duration / 100).toFixed(3);
            console.log("sec:", sec)
            backAudioManager.seek(parseInt(sec));

            // isMoving = false; //改变move状态
        },

        // 获取滑动组件的宽度

        _getMovableViewWidth() {
            // 创建选择器
            let selQuery = this.createSelectorQuery();

            selQuery.select('.movable-area').boundingClientRect()

            selQuery.select('.movable-view').boundingClientRect()

            // 执行上面两组的请求
            selQuery.exec((result) => {
                console.log(result);
                movableAreaWidth = result[0].width;
                movableViewWidth = result[1].width;
            });
        },
        _bindEvent() {
            // 等待中
            backAudioManager.onWaiting(() => {
                console.log("waiting");
            })

            //可以播放
            backAudioManager.onCanplay(() => {
                // console.log("canPlay");

                if (typeof backAudioManager.duration != "undefined") {
                    // 设置歌曲总时长
                    this._setTime()
                } else {
                    setTimeout(() => {
                        this._setTime()
                    }, 500)
                }
            });


            // 开始播放
            backAudioManager.onPlay(() => {
                // console.log("play")
                this.triggerEvent('onPlay');

                // 解决 onChange 和 onTouchend 两事件最后执行 onChange 的bug
                isMoving = false;
            })

            // 停止播放
            backAudioManager.onStop(() => {
                console.log("stop")
            })

            // 暂停播放
            backAudioManager.onPause(() => {
                console.log("pause")
                    // 触发事件，向父组件传递， 在父组件绑定onPause 事件
                this.triggerEvent('onPause')
            })


            // 时间更新
            backAudioManager.onTimeUpdate(() => {
                // console.log("update");

                if (!isMoving) {

                    let currentTime = backAudioManager.currentTime;

                    let process = (currentTime / duration);

                    let sec = currentTime.toString().split('.')[0];

                    if (sec != currentSec) {

                        this.setData({
                            process: process * 100,
                            movableDis: (movableAreaWidth - movableViewWidth) * process,
                            currentTime: this._formatTime(currentTime)
                        });
                        currentSec = sec;

                        // console.log("1秒执行一次")
                        // 联动歌词
                        this.triggerEvent("upDateLyric", {
                            currentTime
                        })
                    }
                }

            });

            //播放结束
            backAudioManager.onEnded(() => {
                // console.log("end")
                // 结束时触发下一首
                this.triggerEvent('onEnd')
            })

            //播放错误
            backAudioManager.onError((err) => {
                wx.showToast({
                    title: `播放错误:${err.errMsg}`,
                    icon: 'none',
                    duration: 1500,
                    mask: false,
                });
            });

        },

        // 设置总时长
        _setTime() {
            duration = backAudioManager.duration;

            this.setData({
                totalTime: this._formatTime(duration)
            })
        },

        // 格式化时间
        _formatTime(duration) {
            let time = duration.toString().split('.')[0];

            let minutes = Math.floor(time / 60);
            let second = parseInt(time % 60);

            return this._twoNum(minutes) + ':' + this._twoNum(second);
        },

        // 两位补零
        _twoNum(time) {
            return time >= 10 ? time : '0' + time
        }
    },
})