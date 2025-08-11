import type { Theme } from 'vitepress'
import type { BaseSitePlugins } from '@site-pro/plugins'
import { createSite } from '@site-pro/plugins'
import Layout from '../layout'
import Demo from '../components/demo'

const theme: Theme = {
    Layout: Layout,
    enhanceApp ({ app }) {
        const site: BaseSitePlugins = createSite({
            screen: {
                classes: true
            }
        })
        app.use(site)
        app.component('Demo', Demo)
    }
}

export default theme
