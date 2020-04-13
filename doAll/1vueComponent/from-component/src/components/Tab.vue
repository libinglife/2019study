<template>
<div class="tabs">
    <div class="tabs-bar">
        <div :class="tabClass(item)" v-for="(item, index) in navList" :key="index" @click="handChange(index)">
            {{item.label}}
        </div>
    </div>
    <div class="tabs-content">
        <slot></slot>
    </div>

</div>
</template>

<script>
import Pane from "./Pane";
export default {
    name: 'Tab',
    components: {

    },
    props: {
        value: {
            type: [Number, String]
        }
    },
    data() {
        return {
            navList: [], //导航标题，
            currentValue: this.value //当前选中的值
        };
    },
    watch: {
        currentValue(newValue) {
            console.log("改变获取新值", newValue);

            // 更新内容
            this.upDateStatus()
        }
    },
    computed: {},
    methods: {

        // tab的class 方法
        tabClass(item) {
            return ["tabs-tab", {
                'tabs-tab-active': item.name == this.currentValue
            }]
        },
        // 获取tab
        getTas() {
            // 获取子组件的的个数，以及数据
            // console.log("属性名：",this.$children[0].$options.name);
            let children = this.$children
            return children.filter(item => {
                return item.$options.name == "pane"
            });
        },

        //  接受子组件更新的方法
        upDateNav() {
            this.navList = []
            let tabs = this.getTas()
            tabs.forEach((tab, index) => {
                this.navList.push({
                    label: tab.label,
                    name: tab.name || index
                })
                // 还需要判断使用者是否传给选中的索引，
                if (index == 0) {
                    if (!this.currentValue) {
                        this.currentValue = tab.name || index
                    }
                }

                // 在这里遍历也可以 获知显示哪个tab 下的内容
                tab.show = tab.name === this.currentValue
            })
            //同时跟新内容显示
            // this.upDateStatus()
            // console.log(this.navList)
        },

        // 切换标题
        handChange(index) {
            // 获取到当前点中的标题
            let nav = this.navList[index]
            let name = nav.name
            if (this.currentValue == name) {
                return
            }
            //然后改变当前的状态值，
            this.currentValue = name
            //组件的v-model 使用@input 接受，完成双向绑定作用
            this.$emit('input', name)

            // 通知父组件 定义一个事件通知外部组件发生状态改变
            this.$emit('tabClick', name)
        },

        // 内容展示状态判断
        upDateStatus() {

            let tabs = this.getTas()

            // 循环遍历当前的选中 和那个名字相同，显示那个
            tabs.forEach((tab) => {
                tab.show = tab.name === this.currentValue
            })
        }

    },
    created() {},
    mounted() {
        this.upDateNav()
    }
};
</script>

<style scoped>
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
