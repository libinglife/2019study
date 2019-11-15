import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

Vue.config.productionTip = false


// 设置请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = localStorage.getItem('token')
    if (token) { // 如果存在令牌这添加token请求头
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
})

// 响应拦截器
// 参数1表示成功响应
// 这里只关心失败响应
axios.interceptors.response.use(null, err => {
    if (err.response.status === 401) { // 没有登录或者令牌过期
        // 清空vuex和localstorage
        vm.$store.dispatch("logout");
        // 跳转login
        vm.$router.push("/login");
    }
    return Promise.reject(err);
});

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        const token = localStorage.getItem("token");
        if (!token) {
            next({
                path: '/login',
                query: { redirect: to.path }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')