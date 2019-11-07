<template>
  <div>
    <input :type="type" :value="value" @input="onInput">
  </div>
</template>

<script>
export default {
  name: "defineInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(e) {
      console.log("输入事件");
      let value = e.target.value;
      this.$emit("input", value);
    }
  }
};
</script>

<style>
</style>