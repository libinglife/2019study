<template>
  <div class="hello">
    <h2 @click="busEmit">name:{{name}}</h2>
    <h2>{{ msg }}</h2>
    <!-- <p>{{test}}</p> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      name: "弟弟组件",
      test: "测试ref初始数据"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$parent.$on("lookYouself", function(e) {
        console.log(e);
      });
    },

    // 事件总线
    busEmit() {
      this.$bus.$emit("busEmit", "发送的bus");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  border: 1px solid red;
}
</style>
