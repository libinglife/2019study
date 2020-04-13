<template>
<div class="fromItme">
    <label for="">
        {{label}}
    </label>
    <!-- input插槽 -->
    <slot></slot>
    <!-- 校验信息 -->
    <p class="errorMessage" v-if="errerMessage">{{errerMessage}}</p>
</div>
</template>

<script>
import Schema from 'async-validator';
export default {
    components: {},
    //   注入父组件传递的数据
    inject: ["from"],
    props: {
        label: {
            type: String,
            default: ""
        },
        prop: String //获取当前组件的key 
    },
    data() {
        return {
            errerMessage: ""
        };
    },
    mounted() {
        //   fromItem 接受input emit传递的校验事件
        this.$on("validator", () => {
            //   执行校验
            this.validator();
        });
    },
    methods: {
        //   校验方法
        validator() {
            // 1.先获取数据
            const value = this.from.model[this.prop];

            // 2.获取规则
            const rules = this.from.rules[this.prop];

            // 创建校验对象，并传入校验规则
            const schema = new Schema({
                [this.prop]: rules
            })

            // 返回一个promise 对象
            return schema.validate({
                [this.prop]: value,
            }, (error) => {
                // console.log(error)
                if (error) {
                    this.errerMessage = error[0].message
                } else {
                    this.errerMessage = ""
                }
            })

        }
    },
};
</script>

<style lang="scss" scoped>
.errorMessage {
    color: red;
}
</style>
