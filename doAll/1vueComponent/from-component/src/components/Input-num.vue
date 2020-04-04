<template>
  <div class="wrapper">
    <el-button
      :disabled="currentValue==min"
      @click="handDown"
    >-</el-button>
    <input
      :value="currentValue"
      @input="onInput"
      type="text"
    >
    <el-button
      :disabled="currentValue==max"
      @click="handUp"
    >+</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(newVal) {
      console.log("父组件的value,发生变化");
      this.upDateValue(newVal);
    },
    //   当前值
    currentValue(newVal) {
      // emit 是使用v-model 改变inputNum值
      //   console.log(newVal);
      this.$emit("input", newVal);
    }
  },
  computed: {},
  methods: {
    //   更新数据
    upDateValue(val) {
      if (val >= this.max) {
        val = this.max;
      } else if (val <= this.min) {
        val = this.min;
      }
      console.log("更新 currentValue");
      this.currentValue = val;
    },
    handUp() {
      if (this.currentValue >= this.max) return;
      this.currentValue++;
    },
    handDown() {
      if (this.currentValue <= this.min) return;
      this.currentValue--;
    },
    onInput(e) {
      console.log("输入值");
      let val = Number(e.target.value.trim());

      if (val >= this.max) {
        val = this.max;
        e.target.value = this.max;
      } else if (val <= this.min) {
        val = this.min;
        e.target.value = this.min;
      }
      this.currentValue = val;
    }
  },
  mounted() {
    this.upDateValue(this.value);
  }
};
</script>
<style  scoped>
.wrapper {
  /* border: 1px solid red; */
  margin-bottom: 20px;
}
input {
  height: 30px;
  line-height: 30px;
  border: 1px solid red;
}
</style>