/*
 * @version: 
 * @Author: 李兵
 * @Date: 2020-04-10 11:02:07
 * @LastEditTime: 2020-04-13 22:06:20
 */
import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../k-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router