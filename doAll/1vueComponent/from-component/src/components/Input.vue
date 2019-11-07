<template>
    <div class="wrapper">
        <input :type="type" :value="value" @input="onInput">
    </div>
</template>

<script>
export default {
  components: {},
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    onInput(e) {
      let value = e.target.value;
      this.$emit("input", value);
      this.$parent.$emit("validate");
    }
  }
};
</script>
<style scoped>
.wrapper {
}
</style>