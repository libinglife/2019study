<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      kForm: this
    };
  },
  props: ["model", "rules"],
  data() {
    return {};
  },

  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.wrapper {
}
</style>