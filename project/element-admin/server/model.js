const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/element-admin', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const ArticleModel = mongoose.model("Article", new mongoose.Schema({
    title: String,
    body: String
}))

module.exports = ArticleModel