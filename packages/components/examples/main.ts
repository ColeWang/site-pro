import { createApp } from 'vue'
import Root from './App.vue'
import router from './router'
import site from '../'

const app = createApp(Root)
app.use(site)
app.use(router)
app.mount('#app')
