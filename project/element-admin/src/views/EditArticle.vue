<template>
<el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
    </el-form-item>

    <el-form-item label="文章内容">
        <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" native-type="submit">保存文章</el-button>
        <el-button>取消</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    data() {
        return {
            article: {
                title: '',
                body: '',
            },
            id: ''
        }
    },
    created() {
        // console.log(this.$route.params)
        this.id = this.$route.params.id;
        this.getDetail()

    },
    methods: {
        // 获取文章详情
        getDetail() {
            this.$http.get(`article/${this.id}`).then(res => {
                console.log(res);
                this.article = {
                    ...res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },

        // 保存文章
        saveArticle() {
            console.log(this.article)

            this.$http.put(`article/${this.id}`, this.article).then(res => {
                console.log(res);
                this.$message({
                    message: '恭喜你，文章修改成功',
                    type: 'success'
                });
                this.$router.push('/ArticleList')
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
