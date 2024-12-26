import type { App } from 'vue'
import { createApp } from 'vue'
import type { Router } from 'vue-router'
import type { BaseSitePlugins } from '@site-pro/plugins'
import { createSite } from '@site-pro/plugins'
import createRouter from '@/router'
import Root from '@/App.vue'
import '@/reset.css'

const app: App = createApp(Root)

const site: BaseSitePlugins = createSite({
    screen: {
        classes: true
    }
})

const router: Router = createRouter()

app.use(site)
app.use(router)

app.mount('#app')
