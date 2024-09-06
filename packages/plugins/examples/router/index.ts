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
            path: '/Home',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/Fullscreen',
            name: 'Fullscreen',
            component: () => import('@/views/Fullscreen.vue')
        },
        {
            path: '/Loading',
            name: 'Loading',
            component: () => import('@/views/Loading.vue')
        },
        {
            path: '/Progress',
            name: 'Progress',
            component: () => import('@/views/Progress.vue')
        },
        {
            path: '/Screen',
            name: 'Screen',
            component: () => import('@/views/Screen.vue')
        },
    ]
})

export default router
