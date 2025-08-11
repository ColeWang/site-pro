import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { basename, dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

function camelize (str: string): string {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

function getExampleImports (comp: string): string[] {
    const docPath: string = resolve(__dirname, '../../')
    const path: string = resolve(docPath, 'examples', comp)
    if (path && existsSync(path)) {
        return readdirSync(path).filter((item) => /\.vue$/.test(item)).map((item) => {
            const file: string = item.replace(/\.vue$/, '')
            const name: string = camelize(`Doc-${comp}-${file}`)
            return `import ${name} from '../examples/${comp}/${file}.vue'`
        })
    }
    return []
}

function combineMarkdown (code: string, script: string): string {
    const frontmatter: number = code.indexOf('---\n\n')
    const header: number = code.search(/\n#{1,6}\s.+/)
    const index: number = header < 0 ? (frontmatter < 0 ? 0 : frontmatter + 4) : header
    return code.slice(0, index) + script + code.slice(index)
}

function combineScript (codes: string[]): string {
    return codes.length ? `\n<script setup>\n${codes.join('\n')}\n</script>\n` : ''
}

function transformPlugin (): Plugin {
    return {
        name: 'transform',
        enforce: 'pre',
        async transform (code: string, id: string) {
            if (id && id.endsWith('.md')) {
                const comp: string = basename(id, '.md')
                const imports: string[] = getExampleImports(comp)
                const script: string = combineScript(imports)
                return combineMarkdown(code, script)
            }
        }
    }
}

export default transformPlugin
