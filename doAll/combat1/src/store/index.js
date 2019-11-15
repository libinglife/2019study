import Vue from 'vue'
import Vuex from 'vuex'
import { loginApi } from './../api/user';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: localStorage.getItem("token") ? true : false,
        username: "李兵"
    },
    mutations: {
        setLoginState(state, params) {
            state.isLogin = params
        }
    },
    actions: {
        login({ commit }, user) {
            // 请求登录
            return loginApi(user).then(res => {
                const { code, token } = res.data;
                if (code == 0) {
                    //   登录成功
                    commit("setLoginState", true);
                    localStorage.setItem('token', token)
                }
                return code
            }).catch(err => {
                console.log(err);
                return err
            })
        },
        logout({ commit, state }) {
            commit('setLoginState', false);
            localStorage.removeItem('token');
        }
    },
    modules: {}
})