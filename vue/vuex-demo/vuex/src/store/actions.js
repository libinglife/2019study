import {ADD_PRICE ,CHANGE_NAME} from './mutation-type';
import * as type from './mutation-type'

console.log(ADD_PRICE)
console.log([ADD_PRICE])
export  default  { //可以异步操作

   [ADD_PRICE]({commit} ,payload){
    setTimeout(function () {
      commit(ADD_PRICE,payload)
    },1000)
  } ,

  [CHANGE_NAME] ({commit}, payload){
    setTimeout(function () {
      commit( CHANGE_NAME ,{
        name:payload.name
      })
    },1000)
  }
}
