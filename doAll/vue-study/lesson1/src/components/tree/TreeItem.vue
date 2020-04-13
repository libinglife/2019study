<template>
<li class="TreeItme">
    <div @click="toggle">
        <!-- 标题 -->
        {{model.title}}
        <!-- 有子元素就显示 + 号 -->
        <span v-if="isFolder">{{open?"-":"+"}}</span>
    </div>

    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">

        <TreeItme class="item" v-for="model in model.children" :model="model" :key="model.title"></TreeItme>

    </ul>
</li>
</template>

<script>
export default {
    name:"TreeItme", //name 属性一定要加
    components: {},
    props: {
        model: {
            type: Object,
            // required: true
        }
    },
    data() {
        return {
            open: false
        }
    },
    watch: {},
    computed: {
        isFolder() {
            return this.model.children && this.model.children.length > 0
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.open = !this.open
            }
        }
    },
    created() {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
