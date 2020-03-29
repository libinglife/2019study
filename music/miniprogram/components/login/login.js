// components/login/login.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        modelShow: {
            type: Boolean
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
        // 获取用户授权信息
        onGetUserInfo(event) {
            const userInfo = event.detail.userInfo;

            // 同意授权
            if (userInfo) {
                // 弹框关闭
                this.setData({
                    modalShow: false
                })
                this.triggerEvent('loginSuccess', userInfo)
            } else {
                // 不同意授权
                this.triggerEvent('loginError')
            }

        }
    }
})