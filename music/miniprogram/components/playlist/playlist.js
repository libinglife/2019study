// components/playlist/playlist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        playlist: {
            type: Object,
        }
    },
    observers: {
        ['playlist.playCount'](count) {
            const _count = this._tranNum(count, 2);
            // console.log(count)
            // console.log(_count)
            this.setData({
                _count: _count
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _count: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 过滤数据
        _tranNum(count, point) {
            // console.log(count);
            let numStr = count.toString().split('.')[0];
            //146 4123
            if (numStr.length < 6) {
                return numStr
            } else if (numStr.length >= 6 && numStr.length <= 8) {
                let decimals = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
                return parseFloat(parseInt(numStr / 10000) + '.' + decimals) + '万'
            } else if (numStr > 8) {
                let decimals = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
                return parseFloat(parseInt(numStr / 100000000) + '.' + decimals) + '亿'
            }
        },
        // 跳转音乐列表
        goMusicList(event) {
            // console.log(event.currentTarget);
            const playlistId = event.currentTarget.dataset.playlistid
            wx.navigateTo({
                // 第一种方法
                // url: `../../pages/musiclist/muisclist?playlistId=${playlistId}`,
                // 第二种方法
                url: `../../pages/musiclist/muisclist?playlistId=${this.properties.playlist.id}`,

            });
        }
    }
})