<template>
<div class="ArticleList">
    <el-table :data="articleList">
        <el-table-column prop="title" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="body" label="内容" width="180">
        </el-table-column>

        <el-table-column label="操作" width="150">
            <template slot-scope="scope">
                <el-button @click="del(scope.row._id)" type="text" size="small">删除</el-button>
                <el-button type="text" @click="edit(scope.row._id)" size="small">编辑</el-button>
            </template>
        </el-table-column>

    </el-table>
</div>
</template>

<script>
export default {
    name: 'ArticleList',
    data() {
        return {
            articleList: [],
        };
    },
    created() {
        this.getArticles()
    },
    methods: {
        getArticles() {
            this.$http.get('articles')
                .then(res => {
                    console.log(res)
                    if (res.data.status == 0) {
                        this.articleList = res.data.articleList
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        del(id) {
            this.$http.delete(`article/${id}`).then(res => {
                console.log(res)
                this.$message({
                    message: '恭喜你，文章删除成功',
                    type: 'success'
                });
                this.getArticles()
            }).catch(err => {
                console.log(err)
            })
        },
        edit(id) {
            
            this.$router.push(`/EditArticle/${id}`)
        }
    },
}
</script>
