<template>
  <div
    class="pane"
    v-show="show"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "pane",
  components: {},
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      show: true
    };
  },
  watch: {
    label(val) {
      this.upDateNav();
    }
  },
  computed: {},
  methods: {
    upDateNav() {
      this.$parent.upDateNav();
    }
  },

  mounted() {
    // 初始化调用更新父组件的方法
    this.upDateNav();
  }
};
</script>
<style  scoped>
[v-cloak] {
  display: node;
}
</style>