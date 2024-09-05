import { createApp } from 'vue'
import Root from './App.vue'
import router from './router'
import { createSite } from '../src'

const site = createSite()

const app = createApp(Root)
app.use(site)
app.use(router)
app.mount('#app')
