<template>
  <div class="check">
      <label for="">协议</label>
      <!-- <input v-model="checked" type="checkbox"> -->
      <input :checked="checked" v-bind="$attrs" @change="onChange" type="checkbox">
      <!-- {{$event}} -->
      <p>选中的值：{{checked}}</p>
       
  </div>
</template>

<script>
export default {
  components:{},
  props:{checked:Boolean},

 //   需要改变v-model 的写法
  model:{
      event:"change",
      prop:'checked'
  },
  data(){
    return {
       
    }
  },
  watch:{},
  computed:{},
  methods:{
      onChange(e){
          console.log(e.target.checked)
          this.$emit('change',e.target.checked)
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>

</style>