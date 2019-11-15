<template>
  <div>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    //    获取用户信息
    axios.get("/api/userInfo").then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>