<template>
  <div>
    <div class="logo">
      <img src="https://img.kaikeba.com/logo-new.png" alt>
    </div>

    <!-- <cube-button>登录</cube-button> -->

    <cube-form
      v-if="!isLogin"
      :model="model"
      :schema="schema"
      @submit="handleLogin"
      @validate="handleValidate"
    ></cube-form>

    <cube-button v-else @click="logOut">退出</cube-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        // 表单定义结构
        fields: [
          //定义字段
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              //校验规则
              required: true
            },
            // 触发校验 失去焦点 也有其他选项
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              type: "password",
              placeholder: "请输入密码",
              eye: {
                open: true
              }
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["isLogin", "username"])
  },

  methods: {
    //   登录
    handleLogin(e) {
      //   阻止表单默认提交行为;
      e.preventDefault();
      //   登录请求;
      this.$store
        .dispatch("login", this.model)
        .then(code => {
          console.log(code);
          if (code == 0) {
            console.log(this.$route);

            const path = this.$route.query.redirect || "/";
            this.$router.push(path);
            // alert("登录成功");
          } else {
            const toast = this.$createToast({
              time: 2000,
              txt: "登录失败",
              type: "error"
            });
            toast.show();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 退出登录
    // logOut() {
    //   //   this.$store.dispatch("logout");
    // },
    ...mapActions({
      logOut: "logout"
    }),

    //  校验
    handleValidate() {}
  },
  components: {}
};
</script>

<style >
.logo img {
  transform: rotateY(180deg);
}
</style>