<template>
  <div class="wrapper">
    <label for>{{label}}</label>
    <slot></slot>
    <p v-if="errStatus">{{errMessage}}</p>
  </div>
</template>

<script>
import Schem from "async-validator";
export default {
  inject: ["kForm"],
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
  methods: {
    myValidate() {
      console.log(this.kForm);
      console.log("过滤发发你发");
      const rules = this.kForm.rules[this.prop];
      const value = this.kForm.model[this.prop];

      const descriptor = { [this.prop]: rules };

      let schem = new Schem(descriptor);
      schem.validate({ [this.prop]: value }, errors => {
        console.log(errors);
        if (errors) {
          this.errMessage = errors[0].message;
          this.errStatus = true;
        } else {
          this.errMessage = "";
          this.errStatus = false;
        }
      });
    }
  },
  created() {},
  mounted() {
    this.$on("validate", this.myValidate);
  }
};
</script>
<style  scoped>
.wrapper {
}
</style>