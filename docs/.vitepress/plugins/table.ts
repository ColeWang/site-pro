import type { MarkdownRenderer } from 'vitepress'

function createTableContainer (md: MarkdownRenderer): void {
    md.renderer.rules.table_open = () => {
        return '<div class="doc-table-wrapper"><table>'
    }
    md.renderer.rules.table_close = () => {
        return '</table></div>'
    }
}

export default createTableContainer
