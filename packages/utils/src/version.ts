import { concat, gt, lt, split, zipWith } from 'lodash-es'

export const version: string = __VERSION__

function parse (v: string): number[] {
    return split(v, '.', 3).map(Number)
}

function padded (parts: number[], length: number): number[] {
    return concat(parts, Array(length - parts.length).fill(0))
}

export function compareVersions (v1: string, v2: string): 1 | -1 | 0 {
    const parts1: number[] = parse(v1)
    const parts2: number[] = parse(v2)

    const maxLength: number = Math.max(parts1.length, parts2.length)

    const paddedParts1: number[] = padded(parts1, maxLength)
    const paddedParts2: number[] = padded(parts2, maxLength)

    const comparisons: (1 | -1 | 0)[] = zipWith(paddedParts1, paddedParts2, (a, b) => {
        return (gt(a, b) && 1) || (lt(a, b) && -1) || 0
    })

    return comparisons.find((comp) => comp !== 0) || 0
}
