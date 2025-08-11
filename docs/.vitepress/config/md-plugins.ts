import type { MarkdownRenderer } from 'vitepress'
import mdContainer from 'markdown-it-container'
import demoContainer from '../plugins/demo'
import tableWrapper from '../plugins/table-wrapper'

function config (md: MarkdownRenderer): void {
    md.use(mdContainer, 'demo', demoContainer(md))
    md.use(tableWrapper)
}

export default config
