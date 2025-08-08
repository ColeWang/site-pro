import type { Theme } from 'vitepress'
import Layout from '../layout/index.vue'

const theme: Theme = {
    Layout: Layout,
    enhanceApp ({ app }) {
    }
}

export default theme
