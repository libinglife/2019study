<template>
<el-form ref="form" @submit.native.prevent="saveArticle" :model="article" label-width="80px">
    <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
    </el-form-item>

    <el-form-item label="文章内容">
        <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" native-type="submit">创建文章</el-button>
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
            }
        }
    },
    methods: {
        saveArticle() {
            this.$http.post('articles', this.article)
                .then(res => {
                    console.log(res)
                    if(res.data.status==0){
                      this.$message({
                          message: '恭喜你，文章创建成功',
                          type: 'success'
                      });

                      this.$router.push('/ArticleList')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>
