import type { MarkdownRenderer } from 'vitepress'
import container from 'markdown-it-container'
import table from '../plugins/table'
import demo from '../plugins/demo'

function mdPlugin (md: MarkdownRenderer): void {
    md.use(container, 'demo', demo(md))
    md.use(table)
}

export default mdPlugin
