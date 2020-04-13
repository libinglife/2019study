<template>
<div class="tabs">
    <!-- tab切换 -->
    <div class="tabs-bar">
        <div @click="handChange(index)" :class="tabClass(item)" v-for="(item ,index) in navList" :key="index">
            {{item.label}}
        </div>
    </div>

    <!-- 显示内容 -->
    <div class="tabs-content">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            navList: [],
            currentValue: this.value
        }
    },
    watch: {
        value(newValue) {
            // console.log(newValue)
            this.currentValue = newValue
            this.updateStaus()
        }
    },

    created() {},
    mounted() {
        this.updateStaus()
    },
    methods: {
        // tab的class 方法
        tabClass(item) {
            return ["tabs-tab", {
                'tabs-tab-active': item.name == this.currentValue
            }]
        },
        getTabs() {

            let children = this.$children

            return children.filter(item => item.$options.name == "pane")

        },
        updateStaus() {
            this.navList = [];
            let tabs = this.getTabs();

            tabs.forEach(item => {
                this.navList.push({
                    label: item.label,
                    name: item.label
                })

                //   改变子组件的显示
                item.show = this.currentValue == item.label
            })
        },
        //   切换tab
        handChange(index) {
            let item = this.navList[index]
            // console.log("改变")
           
            this.$emit('input', item.label)
        }
    },
}
</script>

<style lang="scss" scoped>
.tabs {
    font-size: 14px;
    color: #657180;
}

.tabs-bar::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #d7dde4;
    margin-top: -1px;
}

.tabs-tab {
    display: inline-block;
    padding: 4px 16px;
    margin-right: 6px;
    background-color: #fff;
    border: 1px solid #d7dde4;
    cursor: pointer;
    position: relative;
}

.tabs-tab-active {
    color: #3399ff;
    border: 1px solid #3399ff;
    border-bottom: 1px solid #fff;
}

.tabs-tab-active::before {
    content: "";
    display: block;
    height: 1px;
    background: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

}

.tabs-content {
    padding: 8px 0;
}
</style>
