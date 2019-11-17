import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import interceptor from './interceptor';


Vue.config.productionTip = false




// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        const token = localStorage.getItem("token");
        if (!token) {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

// 执行拦截器
interceptor(app)