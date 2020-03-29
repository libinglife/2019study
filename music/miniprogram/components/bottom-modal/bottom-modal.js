// components/bottom-modal/bottom-modal.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modelShow: Boolean
    },
    options: {
        // 组件样式可以享用外部样式
        styleIsolation: 'apply-shared',
        multipleSlots: true
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
        // 关闭底部弹窗
        closeModal() {
            // console.log(this.data);
            this.setData({
                modelShow: false
            })
        }
    }
})