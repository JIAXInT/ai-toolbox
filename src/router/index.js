import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ViralGenerator from '../views/ViralGenerator.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/viral-generator',
        name: 'ViralGenerator',
        component: ViralGenerator
    },
    {
        path: '/wechat-article-generator',
        name: 'WeChatArticleGenerator',
        component: () => import('../views/WeChatArticleGenerator.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
