<template>
<el-container>
    <el-aside width='201px' min-width="201px" style="background:lightblue">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu router default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="/">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">文章</span>
                </template>
                <el-menu-item-group>
                    <!-- <span slot="title">分组一</span> -->
                    <el-menu-item index="/ArticleList">文章列表</el-menu-item>
                    <el-menu-item index="/CreateArticle">创建文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>

    <el-container>
        <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
        </el-header>

        <el-main>
           <router-view></router-view>
        </el-main>
    </el-container>

</el-container>
</template>

<style>
html ,body{
  padding: 0;
  margin: 0;
}
.el-container{
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    /* min-height: 400px; */
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-submenu .el-menu {
    background: lightblue;
}
</style>

<script>
export default {
    data() {
        const item = {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
        };
        return {
            tableData: Array(10).fill(item),
            isCollapse: true
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>
