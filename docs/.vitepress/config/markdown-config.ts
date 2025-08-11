import type { MarkdownRenderer } from 'vitepress'
import table from '../plugins/table'

function config (md: MarkdownRenderer): void {
    md.use(table)
}

export default config
