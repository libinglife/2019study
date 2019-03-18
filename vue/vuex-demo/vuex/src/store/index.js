import Vue from 'vue';
import Vuex from 'vuex';

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
    ] ,
    author:'李兵',
    age:'24',
    national:'china'
  },
  getters:{
    product :function (state) {
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
       console.log(payload)
      // setTimeout(function () {  //不可以异步操作
        state.product.forEach((item , index)=> {
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
    addPrice ({commit} ,payload){

      setTimeout(function () {
        commit('addPrice' ,payload)
      },1000)

    } ,
    changeName ({commit}, payload){
      setTimeout(function () {
        commit('changeName' ,{
          name:payload.name
        })
      },1000)

    }
  }
})


