<template>
  <div>
    <h3>用户信息</h3>
    <!-- 用户名称 -->
    <h2>{{userInfo.name}}</h2>
    {{$route.params.id}}
    <ul>
      <li>
        <router-link :to="{path:'/user/'+$route.params.id+'/hobby'}">爱好</router-link>
      </li>
      <li>
        <router-link :to="{path:'/user/'+$route.params.id+'/special'}">特长</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
let users = [
  {
    name: "李兵"
  },
  {
    name: "小庆庆"
  }
];
export default {
  name: "user",
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    let route = this.$route;
    let { id } = route.params;
    console.log(route);
    this.userInfo = users[id - 1];
  }
};
</script>

<style lang="scss" scoped>
</style>