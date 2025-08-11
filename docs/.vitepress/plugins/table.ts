import type { MarkdownRenderer } from 'vitepress'

function createTableWrapper (md: MarkdownRenderer): void {
    md.renderer.rules.table_open = () => '<div class="table-wrapper"><table>'
    md.renderer.rules.table_close = () => '</table></div>'
}

export default createTableWrapper
