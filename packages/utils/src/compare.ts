import { gt, head, lt, split, zipWith } from 'lodash-es'

function parse (version: string): number[] {
    return split(version, '.', 3).map(Number)
}

function compare (v1: string, v2: string, operation: (value: 0 | 1 | -1) => boolean): boolean {
    const result = zipWith(parse(v1), parse(v2), (a, b) => {
        return (gt(a, b) && 1) || (lt(a, b) && -1) || 0
    }).filter((value) => value !== 0)
    return operation(head(result) || 0)
}

function compareVersionEq (v1: string, v2: string): boolean {
    return compare(v1, v2, (value) => value === 0)
}

function compareVersionGt (v1: string, v2: string): boolean {
    return compare(v1, v2, (value) => value === 1)
}

function compareVersionGte (v1: string, v2: string): boolean {
    return compare(v1, v2, (value) => value === 0 || value === 1)
}

function compareVersionLt (v1: string, v2: string): boolean {
    return compare(v1, v2, (value) => value === -1)
}

function compareVersionLte (v1: string, v2: string): boolean {
    return compare(v1, v2, (value) => value === 0 || value === -1)
}

export {
    compareVersionEq,
    compareVersionGt,
    compareVersionGte,
    compareVersionLt,
    compareVersionLte
}
