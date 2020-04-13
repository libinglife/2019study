<template>
  <div class="brother">
    <h2 @click="$parent.$emit('lookYouself','照顾好自己')">name:{{name}}</h2>
    <p>注入:{{zhuRu}}</p>

    <!-- 插槽 -->

    <slot></slot>

    <div style="display:block">
      <slot name="content"></slot>
    </div>

    <!-- 作用域插槽 -->
    <hr>
    <slot
      name="zuoyongyu"
      :scopedata="scopedata"
    ></slot>
    <hr>
    <slot
      name="zuoyongyu2"
      test="你好"
    ></slot>

  </div>
</template>

<script>
export default {
  components: {},
  inject: ["zhuRu"],
  props: {},
  data() {
    return {
      name: "我是哥哥组件",
      scopedata: "作用域插槽数据"
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.$bus.$on("busEmit", e => {
      console.log("bus接收:", e);
    });
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>