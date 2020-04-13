<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >

    <!-- 表单组件 -->
    <FromTest></FromTest>

    <HelloWorld
      ref="hw"
      msg="这是父传子 属性传值"
    />

    <Brother>
      <!-- <p>匿名插槽</p>
      <p slot="content">具名插槽</p> -->

      <!-- 新语法 vue 2.6后 -->

      <template v-slot:default>匿名插槽</template>

      <template v-slot:content>具名插槽</template>

      <!-- 使用作用域插槽 ，即使用子组件自身的数据 -->
      <template v-slot:zuoyongyu="slotProps">{{slotProps.scopedata}}</template>
      <!-- 解构赋值 -->
      <template v-slot:zuoyongyu2="{test}">{{test}}</template>
    </Brother>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Brother from "@/components/Brother.vue";
import FromTest from "@/components/from";



export default {
  name: "Home",
  provide() {
    console.log(this);
    return {
      zhuRu: this.zhuru
    };
  },

  components: {
    HelloWorld,
    Brother,
    FromTest
  },
  data() {
    return {
      zhuru: "data 测试动态注入"
    };
  },
  created() {
    // 父组件先于子组件创建 所以这里获取的是undefined
    // console.log(this.$refs.hw);
  },
  mounted() {
    console.log(this);
    // console.log(this.$refs.hw);
    // 改变子组件的数据
    // this.$refs.hw.test = "父组件改变数据";
    //另外一种
    // console.log(this.$children);
    // this.$children[0].test = "children 数据";
  },
  methods: {
    onload() {
      this.$nexkTick(() => {
        return this.zhuru;
      });
    }
  }
};
</script>
