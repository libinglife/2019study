// pages/blog-comment/blog-comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        blog:{},
        commentList:[],
        blogId:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            blogId:options.blogId
        })
        this._getBlogDetail()
    },

    // 获取具体的博客
    _getBlogDetail(){
        wx.showLoading({
          title: '加载中',
          complete: (res) => {},
          fail: (res) => {},
          mask: true,
          success: (res) => {},
        })

        wx.cloud.callFunction({
            name:'blog',
            data:{
                $url:"detail",
                blogId:this.data.blogId
            }
        }).then(res=>{
            console.log(res)
            let commentList = res.result.commentList.data

            this.setData({
                commentList,
                blog:res.result.detail.data[0]
            })
            console.log( this.data.blog)
            wx.hideLoading()
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        const blog = this.data.blog
        return {
          title: blog.content,
          path: `/pages/blog-comment/blog-comment?blogId=${blog._id}`,
          imageUrl:blog.img[0]
        }
    }
})