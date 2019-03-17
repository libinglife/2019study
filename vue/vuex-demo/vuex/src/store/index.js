import Vue from 'vue';
import Vuex from 'vuex';
import jquery from 'jquery'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    product: [
      {
        name: '手机',
        type: '小米8',
        price:'3000'
      },
      {
        name: '电脑',
        type: '联想小新潮',
        price:'5800'
      }
    ]
  },
  getters:{
    getterProduct :function (state) {
      return state.product
    },
    halfPrice :(state)=>{

      let priceHalf =state.product.map((item)=>{
        return item.price/2
      });
      console.log(priceHalf)
      return priceHalf
    }
  },
  mutations:{
    downPrice(state ,payload){
      console.log(payload);
        state.product.forEach((item)=>{
          item.price = item.price-payload.downNum
        })
    },
    addPrice (state ,payload){
      // setTimeout(function () {
        state.product.forEach((item , index)=>{
          item.price = Number(item.price)+payload.addNum
        })
      // },1000)
    },
    changeName (state ,payload) {
      state.product.forEach((item ,index)=>{
        item.name = payload.name+index
      })
    }
  },
  actions:{ //可以异步操作
    /*test(context ,payload){
      console.log(payload)
      context.commit('addPrice' ,payload)
    }*/
    text ({commit} ,payload){

      setTimeout(function () {
        commit('addPrice' ,payload)
      },1000)

    } ,
    changeName ({commit}, payload){
      jquery.ajax({
        url: './assets/ajax.json',
        type: 'get',
        success: function (res) {
          console.log(res);

          commit('changeName' ,{
            name:res.name
          })
        },
        error :function (err) {
          console.log(err)
        }
      })
    }

  }


})


