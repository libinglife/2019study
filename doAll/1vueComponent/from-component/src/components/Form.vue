<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
export default {
  components: {},
  props: ["model", "rules"],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.wrapper {
}
</style>