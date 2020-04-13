<template>
<div v-show="isShow" class="notice">
    <h1>{{title}}</h1>
    <h2>{{message}}</h2>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        title: {
            type: String,
            default: ""
        },
        message: {
            type: String,
            default: ""
        },
        duration: {
            type: Number,
            default: 30000
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        show() {
            this.isShow = true;
            setTimeout(() => {
                this.hide()
            }, this.duration);
        },
        hide() {
            console.log(this)
            this.isShow = false;
            this.remove();
        }
    },
    created() {},
    mounted() {
        // this.show()
    }
};
</script>

<style lang="scss" scoped>
.notice {
    border: 1px solid red;
    position: absolute;
    top: 0;
    left: 10%;
    background: pink;
    width: 100%;
    height: 300px;

}
</style>
