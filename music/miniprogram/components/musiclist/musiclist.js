// components/musiclist/musiclist.js

let app = getApp();
// console.log("组件：", app.globalData.playingMusicId)
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musiclist: {
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        playingMusicId: app.globalData.playingMusicId //点击的Id
    },

    // 
    pageLifetimes: {
        show() {
            console.log("页面显示的时候");

            this.setData({
                playingMusicId: app.globalData.playingMusicId
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        chooseOneMusic(event) {
            let index = event.currentTarget.dataset.index;
            let playingMusicId = this.properties.musiclist[index].id;
            this.setData({
                playingMusicId: playingMusicId
            });

            wx.navigateTo({
                url: `/pages/player/player?musicId=${playingMusicId}&index=${index}`
            });
        }
    }
})