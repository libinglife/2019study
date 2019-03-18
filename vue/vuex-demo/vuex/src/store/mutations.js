import * as types from "./mutation-type";
import {DOWN_PRICE , ADD_PRICE ,CHANGE_NAME} from "./mutation-type";

console.log(types)


export  default {
  [DOWN_PRICE](state ,payload){
    console.log(payload);
    state.product.forEach((item)=>{
      item.price = item.price-payload.downNum
    })
  },
  [ADD_PRICE](state ,payload){
    state.product.forEach((item , index)=> {
      item.price = Number(item.price)+payload.addNum
    })
  },
  [CHANGE_NAME] (state ,payload) {
    state.product.forEach((item ,index)=>{
      item.name = payload.name+index
    })
  }
}
