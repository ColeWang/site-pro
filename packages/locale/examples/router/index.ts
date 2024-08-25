import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: '_home',
            redirect: { name: 'Home' }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        },
    ]
})

export default router
