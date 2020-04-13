<template>
  <div class="sync">
      <input type="text" :value="zhi" @input="onChange">
  </div>
</template>

<script>
export default {
  components:{},
  props:{
      zhi:{
          type:[String,Number],
          default:''
      }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
      onChange(e){
          this.$emit('update:zhi',e.target.value)
       
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
</style>