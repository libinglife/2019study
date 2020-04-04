<template>
<div id="app">
    <!-- // 自己封装的组件 -->
    <!-- tab标签组件 -->
    <tab v-model="activeSelect" @tabClick="onTabClick">
    <!-- <tab @tabClick="onTabClick"> -->
        <pane label='首页' name='首页'>
            首页的内容
        </Pane>
        <pane label="我的博客" name="博客">
            博客的内容
        </pane>
        <pane label="个人中心" name="我的">
            个人中心的内容
        </pane>
    </tab>

    <hr>
    <!-- 数字框组件 -->
    <input-num v-model="inputNum" :min="0" :max="1000"></input-num>

    <hr>
    <!-- 表单 -->
    <div>
        <!-- <k-input :value="model.username" @input="model.username = arguments[0]"></k-input> -->
        <k-form :model="model" :rules="rules">
            <k-form-item label="用户名" prop="username">
                <k-input v-model="model.username"></k-input>
            </k-form-item>
            <k-form-item label="确认密码" prop="password">
                <k-input v-model="model.password"></k-input>
            </k-form-item>
        </k-form>
    </div>
    <hr>

    <!-- Element的组件 -->
    <div>
        <h3>Element表单</h3>
        <hr>
        <el-form :model="model" :rules="rules" ref="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
                <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import KInput from "./components/Input";
import KFormItem from "./components/FormItem";
import KForm from "./components/Form";
import InputNum from "./components/Input-num";
import Tab from "./components/Tab";
import Pane from "./components/Pane";

export default {
    name: "app",
    components: {
        KInput,
        KFormItem,
        KForm,
        InputNum,
        Tab,
        Pane
    },
    data() {
        return {
            activeSelect: "首页", //当前选中
            value: "",
            inputNum: 20,
            model: {
                username: "tom",
                password: ""
            },
            rules: {
                username: [{
                        required: true,
                        message: "请输入用户名字"
                    },
                    {
                        min: 6,
                        max: 10,
                        message: "请输入6~10的用户名"
                    }
                ],
                password: [{
                    required: true,
                    message: "请输入密码"
                }]
            }
        };
    },
    methods: {
        submitForm() {
            console.log("提交了home");
        },
        onInput(e) {
            console.log(e);
        },
        //tab切换事件通知
        onTabClick(e) {
            // e 是传递过来的参数
            console.log("父组件收到通知", e)
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
