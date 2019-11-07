<template>
  <div>
    <label for>{{label}}</label>
    <div>
      <slot></slot>
      <p v-if="errStatus">{{errMessage}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "formItem",
  props: ["label", "prop"],
  data() {
    return {
      errStatus: false,
      errMessage: ""
    };
  },
  components: {}
};
</script>

<style>
</style>