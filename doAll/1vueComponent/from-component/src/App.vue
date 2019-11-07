<template>
  <div id="app">
    <!-- // 自己的组件 -->
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

export default {
  name: "app",
  components: {
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
      value: "",
      model: { username: "tom", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 6, max: 10, message: "请输入6~10的用户名" }
        ],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm() {
      console.log("提交了home");
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
