<template>
<div class="tabIndex">

    <Tab v-model="currentSelect">
        <Pane label="首页">
            这是首页的内容
        </Pane>
        <Pane label="博客">
            这是博客的内容
        </Pane>
         <Pane label="我的">
            这是我的的内容
        </Pane>
    </Tab>

</div>
</template>

<script>
import Pane from './Pane'
import Tab from './Tab'
export default {
    components: {
        Pane,
        Tab
    },
    props: {},
    data() {
        return {
            currentSelect:"我的"
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
.tabIndex {}
</style>
