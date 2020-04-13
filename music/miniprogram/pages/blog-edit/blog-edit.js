// 最大图片数量
const MAX_IMG_NUM = 9;
// 输入最大字数
const MAX_WORDS_NUM = 140;
//输入的内容
let content = "";

let userInfo = {};

// 初始化 云数据库
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: [],
        selectPhoto: true, //是否显示上传图片按钮
        footerBottom: 0, //底部弹起的高度
        wordsNum: 140, //最多输入多少字
    },
    // 选择图片
    onChooseImage() {

        //还能再选几张图片
        let count = MAX_IMG_NUM - this.data.images.length;
        console.log(count);
        wx.chooseImage({
            count: count,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                console.log(result)
                    // console.log(result.tempFilePaths)

                this.setData({
                    images: this.data.images.concat(result.tempFilePaths)
                });

                //还能再选几张图片
                count = MAX_IMG_NUM - this.data.images.length;
                this.setData({
                    selectPhoto: count <= 0 ? false : true
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },

    // 删除选中图片
    delImage(event) {
        // console.log(event)
        const index = event.target.dataset.index;
        this.data.images.splice(index, 1);
        this.setData({
            images: this.data.images
        })

        // 显示上传图片按钮
        if (this.data.images.length == MAX_IMG_NUM - 1) {
            this.setData({
                selectPhoto: true,
            })
        }
    },

    // 预览图片
    onPreviewImage(event) {
        // console.log(event)
        const currentImg = event.target.dataset.imgsrc;
        // console.log(currentImg)
        wx.previewImage({
            current: currentImg,
            urls: this.data.images,
        });
    },
    // 获取焦点
    onFocus(event) {
        // console.log(event)
        this.setData({
            footerBottom: event.detail.height
        })
    },

    // 失去焦点
    onBlur(event) {
        // console.log(event);
        this.setData({
            footerBottom: 0
        })
    },

    // 输入文本时
    onInput(event) {
        // console.log(event);
        let wordsNum = event.detail.value.length;
        if (wordsNum >= MAX_WORDS_NUM) {
            wordsNum = `最大字数为${MAX_WORDS_NUM}`
        }
        this.setData({
            wordsNum
        });
        // 获取输入内容
        content = event.detail.value
    },

    // 发布博客
    send() {
        // 内容去空检测
        content = content.trim();
        if (content == "") {
            wx.showModal({
                title: '请输入内容',
                content: '',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#3CC51F',
            });
        }

        wx.showLoading({
            title: "发布中",
            mask: true,
        });

        // 1、图片---》云存储fileID 云文件ID
        // 2、数据---》云数据库
        //字段内容 ：昵称、头像、内容、图片fileId 、openId、时间。

        // 解决 云 uploadFile 每次只能上传一张图片
        let promiseAll = [];
        this.data.images.forEach(item => {
            //获取图片扩展名 
            let suffix = item.match(/\.\w+$/)[0];
            let p = new Promise((resolve, reject) => {
                wx.cloud.uploadFile({
                    cloudPath: `blog/${Date.now()+'-'+Math.random()*100000+suffix}`,
                    filePath: item,
                    success: res => {
                        // console.log(res);
                        resolve(res.fileID)
                    },
                    fail: err => {
                        console.log(err);
                        reject(err);
                    }
                })
            });

            // 把异步操作推进数组，一块处理
            promiseAll.push(p);
        });

        // 统一处理 云上传图片
        Promise.all(promiseAll).then(images => {
            // console.log(images);
            // 2.存入数据库
            db.collection('blog').add({
                data: {
                    ...userInfo,
                    content,
                    img: images,
                    createTime: db.serverDate()
                }
            }).then(res => {
                console.log(res);
                wx.hideLoading();
                wx.showToast({
                    title: '发布成功',
                    icon: 'none',
                });

                // 返回blog页面 ,并且刷新
                wx.navigateBack();

                // 取得历史记录栈
                var pages = getCurrentPages();
                console.log(pages)

                // 取得上一个页面
                const prePage = pages[pages.length - 2]
                    // 下拉刷新获取新数据
                prePage.onPullDownRefresh()


            })
        }).catch(err => {
            console.log(err);
            wx.hideLoading()
            wx.showToast({
                title: '发布失败',
            })
        });






    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        userInfo = options;
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