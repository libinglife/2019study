<template>
  <div class="kinput">
    <input
      :value="value"
      @input="onInput"
      v-bind="$attrs"
    >
    <!-- {{$attrs}} -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false, //避免顶层容器继承属性
  components: {},
  props: {
    value: {
      type: String,
      default: ""
    }
    // type: {
    //   type: String,
    //   default: "text"
    // }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);

      // 向父组件发送校验信息
      this.$parent.$emit("validator");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.kinput {
  display: inline-block;
}
</style>