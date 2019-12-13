import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '../views/Login';
import User from "../views/User";
import Hobby from "../views/Hobby";
import Special from "../views/Special";

const routes = [{
    name: 'login',
    path: '/login',
    component: Login
}, {
    name: 'user',
    path: '/user/:id',
    component: User,
    children: [{
        name: 'hobby',
        path: 'hobby',
        component: Hobby,
    }, {
        name: 'special',
        path: 'special',
        component: Special
    }]
}];

export default new Router({
    // mode: 'history',
    mode: 'hash',
    routes
})