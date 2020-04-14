import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import createNotice from "./utils/createNotice";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$createNotice = createNotice


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')