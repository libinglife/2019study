// components/blog-card/blog-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        blog: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
       
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 预览图片
        previewImg(event) {
            let index = event.target.dataset.index
            wx.previewImage({
                current: this.data.blog.img[index],
                urls: this.data.blog.img,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
            });
        }
    }
})