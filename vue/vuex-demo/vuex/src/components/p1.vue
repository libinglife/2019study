<template>
  <div class="p1">
    <h1>{{ msg }}</h1>
    作者：{{author}}，
    年龄：{{age}},
    国籍：{{national}},
    <ul>
      <li v-for="item in product">
        name:{{item.name}}------
        type:{{item.type}}------
        price:{{item.price}}------
      </li>
    </ul>
    降价信息1：{{halfPrice}}<br>

    <button @click="downPrice">降价</button>
    <br>
    <button @click="addPrice({
      'addNum':20
    })">涨价</button>

    <br>
    <button @click="actionAddPrice({
      'addNum':100
    })">异步action涨价</button>
    <br>
    <button @click = 'changeName({
      "name": "李兵"
    })'>异步修改名字</button>
    <br>


    <-------------------><br>
    测试原有的计算属性: {{testCom}} <br>
    mapState外测试: {{testAgain}}
  </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions} from 'vuex'

export default {
  name: 'p1',
  data () {
    return {
      msg: '组件1',
      computedData:20,
      params:1
    }
  },
  // computed:{
  //   // product1 :function () {
  //   //   // return this.$store.state.product
  //   //   return this.$store.getters.getterProduct
  //   // },
  //   halfPrice :function () {
  //     return this.$store.getters.halfPrice
  //   }
  // },
  computed:{
    /*
    * 说明  mapState  mapGetters
    *
    *  都有两种使用方式
    *   第一种
    *  ...mapState({
       product1: "product",
       author: state => state.author,
       })
    *   第二种
    *   ...mapState(["product","age"])
    *
    * */


    // ...mapState({ //对象式使用
    //   product1: "product",
    //   age: "age",
    //   author: state => state.author,
    //   national: state => state.national,
    //   // halfPrice: function () {
    //   //   return this.$store.getters.halfPrice
    //   // },
    //   //测试原有的计算属性
    //   testCom: function () {
    //     return this.computedData + 1
    //   }
    // }),
    // ...mapGetters({ //对象式使用
    //   halfPrice :'halfPrice'
    // }),

    /*---------数组式使用-----------*/
    ...mapState(["age",'author','national']),
    ...mapGetters(['halfPrice',"product"]),


    testAgain :function () {
      return "在外边测试"
    },
    //测试原有的计算属性
    testCom: function () {
      return this.computedData + 1
    }
  },
  methods:{
    downPrice(){  //mutations减价
      // this.$store.commit('downPrice') //第一种 无参数

      // this.$store.commit('downPrice',{   //第二种 有参数
      //   downNum :10
      // })

      this.$store.commit({   //第三种 有参数
        type:'DOWN_PRICE' ,
        downNum :10
      })
    },
    // addPrice (){ // mutations增价
    //   this.$store.commit({
    //     type:'addPrice' ,
    //     addNum :20
    //   })
    // },

    //在调用的时候正常传参
    // ...mapMutations({
    //   addPrice:'addPrice'
    // }),
    ...mapMutations(['addPrice']),



    //-------------异步action-----------------

    ...mapActions({
       actionAddPrice :'ADD_PRICE' ,
      changeName :'CHANGE_NAME'
    }),
    // ...mapActions(["addPrice"]),
    // actionAddPrice(){  //action 增价
    //   this.$store.dispatch('addPrice',{
    //     addNum:20
    //   })
    // },


    // changeName () {  //action异步改名
    //   this.$store.dispatch('changeName',{
    //     name:'李兵'
    //   })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
  border: 1px solid red;
}
a {
  color: #42b983;
}
</style>
