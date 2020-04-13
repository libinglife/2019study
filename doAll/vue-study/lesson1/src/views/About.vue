<template>
  <div class="about">

    <!-- tree 组件 -->
    <Tree></Tree>

     <!-- tab 组件 -->
    <TabTest></TabTest>

    <!-- Checkbox 组件-->
    <Checkbox v-model="checked" test="testPro"></Checkbox>
    <Checkbox :checked="checked" @change="checked=$event" test="testPro"></Checkbox>
    <Checkbox :checked="checked" @change="checked=arguments[0]" test="testPro"></Checkbox>

    <!-- 修饰符 .sync -->
    <SyncInput :zhi.sync="syncValue"></SyncInput>
    <!-- 等效于 -->
    <SyncInput :zhi="syncValue" @update:zhi="syncValue=$event"></SyncInput>

    {{syncValue}}
  </div>
</template>

<script>
import TabTest from "@/components/tab";
import Checkbox from "@/components/Checkbox";
import SyncInput from "@/components/Inputsync";
import Tree from "@/components/tree";
export default {
  components:{
    TabTest,
    Checkbox,
    SyncInput,
    Tree
  },
  props:{},
  data(){
    return {
      checked:false,
      syncValue:"测试sync"
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
.wrapper{}
</style>