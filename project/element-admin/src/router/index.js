import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../views/ArticleList'
import CreateArticle from '../views/CreateArticle'
import EditArticle from '../views/EditArticle'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/ArticleList'
    },
    {
        path: '/ArticleList',
        name: 'ArticleList',
        component: ArticleList
    },
    {
        path: '/CreateArticle',
        name: 'CreateArticle',
        component: CreateArticle
    },
    {
        path: '/EditArticle/:id',
        name: 'EditArticle',
        component: EditArticle
    }
]

const router = new VueRouter({
    routes
})

export default router