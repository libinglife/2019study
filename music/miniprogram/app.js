//app.js
App({
    onLaunch: function () {
        this.checkUpdate()

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                env: 'dev-music-jwein',
                traceUser: true,
            })
        }

        this.globalData = {
            playingMusicId: '', //正在播放的音乐
        }
    },
    // 检查版本更新
    checkUpdate() {
        const updateManger = wx.getUpdateManager()

        updateManger.onCheckForUpdate(res1 => {
            console.log(res1)
            if (res1.hasUpdate) {
                updateManger.onUpdateReady(() => {
                    wx.showModal({
                        cancelText: '取消',
                        confirmText: '确认',
                        content: '有新版本上线，请更新',
                        showCancel: true,
                        success: (result) => {
                            console.log(result)
                            if (result.confirm) {
                                updateManger.applyUpdate()
                            }
                        },
                        title: '版本更新',
                    })
                })
            }
        })
    }
})