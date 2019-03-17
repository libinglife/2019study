<template>
  <div class="p1">
    <h1>{{ msg }}</h1>
    <!--{{product1}}-->
    <ul>
      <li v-for="item in product1">
        name:{{item.name}}------
        type:{{item.type}}------
        price:{{item.price}}------
      </li>
    </ul>
    降价信息：{{halfPrice}}<br>

    <button @click="downPrice">降价</button>
    <br>
    <button @click="addPrice">涨价</button>

    <br>
    <button @click="actionTest">异步action</button>
    <br>
    <button @click = 'changeName'>异步修改名字</button>

  </div>
</template>

<script>
  // import {mapState } from 'vuex'
export default {
  name: 'p1',
  data () {
    return {
      msg: '组件1'
    }
  },
  computed:{
    product1 :function () {
      // return this.$store.state.product
      return this.$store.getters.getterProduct
    },
    halfPrice :function () {
      return this.$store.getters.halfPrice
    }

  },
  methods:{
    downPrice(){
      // this.$store.commit('downPrice') //第一种 无参数

      // this.$store.commit('downPrice',{   //第二种 有参数
      //   downNum :10
      // })

      this.$store.commit({   //第三种 有参数
        type:'downPrice' ,
        downNum :10
      })
    },
    addPrice (){
      this.$store.commit({
        type:'addPrice' ,
        addNum :20
      })
    },
    actionTest(){
      this.$store.dispatch('text',{
        addNum:20
      })
    }
    ,
    changeName () {
      this.$store.dispatch('changeName')
    }
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
