import type { Theme } from 'vitepress'
import type { BaseSitePlugins } from '@site-pro/plugins'
import { createSite } from '@site-pro/plugins'
import Layout from '../layout'

const theme: Theme = {
    Layout: Layout,
    enhanceApp ({ app }) {
        const site: BaseSitePlugins = createSite({
            screen: {
                classes: true
            }
        })
        app.use(site)
    }
}

export default theme
