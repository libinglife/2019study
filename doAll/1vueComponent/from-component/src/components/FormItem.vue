<template>
  <div class="wrapper">
    <label for="">{{label}}</label>
    <slot></slot>
    <p v-if="errStatus">{{errMessage}}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["label", "prop"],
  data() {
    return {
      errMessage: "",
      errStatus: false
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style  scoped>
.wrapper {
}
</style>