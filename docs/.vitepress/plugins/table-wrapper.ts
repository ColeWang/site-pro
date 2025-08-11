import type { MarkdownRenderer } from 'vitepress'

export default (md: MarkdownRenderer): void => {
    md.renderer.rules.table_open = () => {
        return '<div class="table-wrapper"><table>'
    }
    md.renderer.rules.table_close = () => {
        return '</table></div>'
    }
}
