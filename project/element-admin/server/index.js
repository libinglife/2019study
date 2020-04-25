const express = require('express')
const app = express();

const ArticleModel = require('./model')

const cors = require('cors')

app.use(express.json())

// 跨域资源共享
app.use(cors())

app.get('/', async(req, res) => {
    // console.log(ctx)
    res.send("body")
})

// 获取文章列表
app.get('/api/articles', async(req, res) => {
    const result = await ArticleModel.find();

    res.send({
        status: 0,
        articleList: result
    })
})

// 创建文章
app.post('/api/articles', async(req, res) => {
    // console.log(req.body);
    const reqContent = req.body;
    const result = await ArticleModel.create(reqContent);
    console.log(result)
    res.send({...result, status: 0 })
})

// 获取文章详情
app.get('/api/article/:id', async(req, res) => {
    const id = req.params.id

    // const result = await ArticleModel.findOne({
    //     _id: id
    // })

    const result = await ArticleModel.findById(id)
    console.log(result)
    res.send(result)
})

// 修改文章
app.put('/api/article/:id', async(req, res) => {
    const id = req.params.id
    const body = req.body

    // const result = await ArticleModel.updateOne({ _id: id }, body)

    const result = await ArticleModel.findByIdAndUpdate(id, body)
    console.log(result)
    res.send(result)
})

// 删除某篇文章
app.delete('/api/article/:id', async(req, res) => {
    const id = req.params.id
        // const result = await ArticleModel.deleteOne({
        //     _id: id
        // })
    let result = await ArticleModel.findByIdAndDelete(id)
    console.log(result)
    res.send(result)
})

app.listen('3003', () => {
    console.log(`服务监听http://locahost:3003`)
})