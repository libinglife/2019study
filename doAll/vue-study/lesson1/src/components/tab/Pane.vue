<template>
  <div class="pane" v-show="show">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name:'pane',
  components:{},
  props:{
      label:String
  },
  data(){
    return {
        show:false
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>

</style>