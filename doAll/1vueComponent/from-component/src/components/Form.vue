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

  methods: {
    test() {
      console.log("测试");

      let p1 = new Promise((resolve, reject) => {
        resolve({ code: 1 });
      });

      console.log(p1);

      let login = function() {
        const p2 = p1.then(res => {
          // console.log(res);
          return res;
        });
        // console.log(p2);
        const p3 = p2.then(res => {
          return "你好";
          // return new Promise((resolve, reject) => {
          // resolve("你好");
          // });
        });
        console.log(p3);
        return p3;
      };

      // console.log(login());
      login().then(res => {
        console.log(res);
      });
    },
    faBu() {
      let arg = Array.prototype.shift.call(arguments, 3); //删除数组的第一个元素并返回， //改变原数组
      console.log(arg);
    }
  },
  created() {
    this.test();
    this.faBu("name", "age", "你好吗");
  },
  mounted() {}
};
</script>
<style scoped>
.wrapper {
}
</style>