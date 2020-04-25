import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3003/api/'
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')