import { isProxy, toRaw } from 'vue'
import { cloneDeep, cloneWith, isArray, isNumber, isUndefined, omitBy, reduce, toString } from 'lodash-es'
import { isEmpty } from './is'

export interface Dictionary<T> {
    [key: string]: T;
}

export function cloneProxyToRaw<T = unknown> (proxy: Dictionary<T>): Dictionary<T> {
    return cloneWith(proxy, (value) => {
        if (isProxy(value)) {
            const nextValue = toRaw(value)
            return cloneDeep(nextValue)
        } else {
            return value
        }
    })
}

export function namePathToString (namePath: string | Array<string | number[]>): string {
    if (namePath && isArray(namePath)) {
        const pathString = reduce(namePath, (total, value, index) => {
            const result = isNumber(value) && index > 0 ? `[${value}]` : `.${value}`
            return total + result
        }, '')
        return pathString.replace(/^\./, '')
    }
    return toString(namePath)
}

export function omitNil<T = unknown> (object: Dictionary<T> | null | undefined): Dictionary<T> {
    return omitBy(object, isEmpty)
}

export function omitUndefined<T = unknown> (object: Dictionary<T> | null | undefined): Dictionary<T> {
    return omitBy(object, isUndefined)
}

export function toPx (value: number | string): string {
    if (value && isNumber(value)) {
        return `${value}px`
    }
    return value as string
}
