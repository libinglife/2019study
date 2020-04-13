<template>
<ul class="tree">
    <TreeItem :model="treeData"></TreeItem>
</ul>
</template>

<script>
import TreeItem from './TreeItem'
export default {
    components: {
        TreeItem
    },
    props: {},
    data() {
        return {
            treeData: {
                title: "全栈学习班级",
                children: [

                    {
                        "title": 'JAVA科目'
                    },

                    {
                        title: "前端科目",
                        children: [{
                            title: "ES6",
                            children:[
                              {
                                title:"数组用法"
                              },{
                                title:"解构赋值"
                              },
                              {
                                title:"async await"
                              },{
                                title:'模板字符串'
                              }
                            ]
                        }, {
                            title: "webpack"
                        }]
                    }
                ]
            }
        }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.tree {}
</style>
