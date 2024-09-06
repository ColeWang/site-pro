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
            path: '/Action',
            name: 'Action',
            component: () => import('@/views/Action.vue')
        },
        {
            path: '/BaseField',
            name: 'BaseField',
            component: () => import('@/views/BaseField.vue')
        },
        {
            path: '/BaseForm',
            name: 'BaseForm',
            component: () => import('@/views/BaseForm.vue')
        },
        {
            path: '/Descriptions',
            name: 'Descriptions',
            component: () => import('@/views/Descriptions.vue')
        },
        {
            path: '/EditableTable',
            name: 'EditableTable',
            component: () => import('@/views/EditableTable.vue')
        },
        {
            path: '/FloatForm',
            name: 'FloatForm',
            component: () => import('@/views/FloatForm.vue')
        },
        {
            path: '/Form',
            name: 'Form',
            component: () => import('@/views/Form.vue')
        },
        {
            path: '/LocaleProvider',
            name: 'LocaleProvider',
            component: () => import('@/views/LocaleProvider.vue')
        },
        {
            path: '/QueryFilter',
            name: 'QueryFilter',
            component: () => import('@/views/QueryFilter.vue')
        },
        {
            path: '/ResizeObserver',
            name: 'ResizeObserver',
            component: () => import('@/views/ResizeObserver.vue')
        },
        {
            path: '/Table',
            name: 'Table',
            component: () => import('@/views/Table.vue')
        },
    ]
})

export default router
