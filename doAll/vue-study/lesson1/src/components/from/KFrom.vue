<template>
  <div class="from">
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  provide() {
    return {
      from: this //向后代子组件传递数据
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      //   全局校验
      allValidator(cb){
          console.log("全局校验")
          const tasks = this.$children.map(item=>{
             return item.validator()
          })
          console.log(tasks)

          Promise.all(tasks).then(res=>{
              console.log(res)
               cb()
          }).catch(err=>{
              console.log(err)
              cb(err.errors[0])
          })
      }
  },
  created() {},
  mounted() {
      
  }
};
</script>
<style lang="scss" scoped>
</style>