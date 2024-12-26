import type { App } from 'vue'
import { createApp } from 'vue'
import type { Router } from 'vue-router'
import createRouter from './router'
import Root from './App.vue'
import './reset.css'

const app: App = createApp(Root)

const router: Router = createRouter()

app.use(router)

app.mount('#app')
