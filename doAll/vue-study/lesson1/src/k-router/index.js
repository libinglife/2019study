/*
import { Vue } from 'vue';
 * @version: Do not edit
 * @Author: 李兵
 * @Date: 2020-04-13 12:03:51
 * @LastEditTime: 2020-04-13 22:17:27
 */

let Vue
class Router {
    constructor(options) {
        this.$options = options

        // 将path 和component 映射起来
        this.routerMap = {}

        // 利用vue 响应式监听 current 路径值
        this.app = new Vue({
            data() {
                return {
                    current: '/'
                }
            },
        })
    }

    // 初始化
    init() {
        // 绑定hash监听事件
        this.bindEvent()

        // 解析路由配置
        this.createRouteMap(this.$options)

        // 创建router-link 和router-view 组件
        this.initComponent()
    }

    bindEvent() {
        // bind 指定this 为Router ,不然this 会指向window
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }

    onHashChange(event) {
        // http://localhost:8080/ #/home
        console.log(event)

        this.app.current = window.location.hash.slice(1) || "/"
    }

    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routerMap[item.path] = item
        })
    }

    initComponent() {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
                    // return ( < a href = { '#' + this.to } > { this.$slots.default } < /a>)
            },
        })

        Vue.component('router-view', {
            // 使用箭头函数 ，保留 this指向  Router实例
            render: (h) => {
                let Comp = this.routerMap[this.app.current].component
                return h(Comp)
            },
        })
    }
}

// 把VueRouter 变为插件

Router.install = function(_Vue) {
    Vue = _Vue
        //混入 就是Vue 的扩展
    Vue.mixin({
        // 这段代码将来会在 Vue 实例化的时候执行
        // this 是指Vue 组件实例

        beforeCreate() {

            // 我们只想根组件 执行一次 加判断是否有$options.router
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                    // router 初始化
                this.$options.router.init()
            }

        },
    })
}

export default Router