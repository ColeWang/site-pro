import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import type { MarkdownRenderer } from 'vitepress'
import { head } from 'lodash-es'
import type { Token } from '../typings'

const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = dirname(__filename)

const docPath: string = resolve(__dirname, '../../')

interface DemoInfo {
    path: string;
    code: string;
    source: string;
    children: string;
}

interface DemoContainerOptions {
    marker?: string | undefined;
    validate?: (params: string) => boolean;
    render?: (tokens: Token[], idx: number) => string | undefined;
}

function parseDemoInfo (token: Token): DemoInfo {
    const first: Token | undefined = head(token.children)
    // --
    const path: string = first ? first.content : ''
    const filePath: string = resolve(docPath, 'examples', `${path}.vue`)
    const source: string = readFileSync(filePath, 'utf-8')
    const code: string = `\`\`\` vue\n${source}\`\`\``

    const tagName: string = path.replaceAll('/', '-')
    const children: string = `<doc-${tagName}></doc-${tagName}>`

    return { path, code, source, children }
}

function createDemoContainer (md: MarkdownRenderer): DemoContainerOptions {
    return {
        validate (params: string): boolean {
            return !!params.trim().match(/^demo\s+(.*)$/)
        },
        render (tokens: Token[], idx: number): string | undefined {
            const m: RegExpMatchArray | null = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
            if (tokens[idx].nesting === 1) {
                const token: Token = tokens[idx + 2]
                if (token.type === 'inline') {
                    const description: string = m && m.length > 1 ? m[1] : ''
                    const { path, code, source, children } = parseDemoInfo(token)

                    if (!source) throw new Error(`Incorrect source file: ${path}`)

                    return `<Demo description="${
                        encodeURIComponent(md.render(description))
                    }" path="${
                        encodeURIComponent(path)
                    }" code="${
                        encodeURIComponent(md.render(code))
                    }" source="${
                        encodeURIComponent(source)
                    }"><template #source>${children}</template>`
                }
            } else {
                return '</Demo>\n'
            }
        }
    }
}

export default createDemoContainer
