import { gt, head, lt, split, zipWith } from 'lodash-es'

interface Operation {
    (value: 0 | 1 | -1): boolean
}

function parse (version: string): number[] {
    return split(version, '.', 3).map(Number)
}

function compare (v1: string, v2: string, operation: Operation) {
    const result = zipWith(parse(v1), parse(v2), (a, b) => {
        return (gt(a, b) && 1) || (lt(a, b) && -1) || 0
    }).filter((value) => value !== 0)
    return operation(head(result) || 0)
}

export {
    compare
}
