import { gt, lt, split, zipWith } from 'lodash-es'

const version: string = __VERSION__ || '0.3.1'

function parse (v: string): number[] {
    return split(v, '.', 3).map(Number)
}

function compareVersions (v1: string, v2: string, operation: (search: 1 | -1 | 0) => boolean): boolean {
    const parts1: number[] = parse(v1), parts2: number[] = parse(v2)
    const maxLength: number = Math.max(parts1.length, parts2.length)

    // 填充较短的版本号数组
    const paddedParts1: number[] = parts1.concat(Array(maxLength - parts1.length).fill(0))
    const paddedParts2: number[] = parts2.concat(Array(maxLength - parts2.length).fill(0))

    const comparisons: (1 | -1 | 0)[] = zipWith(paddedParts1, paddedParts2, (a, b) => {
        return (gt(a, b) && 1) || (lt(a, b) && -1) || 0
    })

    const firstNonZero: 1 | -1 | 0 = comparisons.find((comp) => comp !== 0) || 0

    return operation(firstNonZero)
}

export { version, compareVersions }
