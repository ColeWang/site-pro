import { isProxy, toRaw } from 'vue'
import { cloneDeep, cloneWith, isArray, isNumber, isUndefined, omitBy, reduce, toString } from 'lodash-es'
import type { NamePath, Recordable } from './types'
import { isEmpty } from './is'

export function cloneProxyToRaw<T = any> (proxy: Recordable<T>): Recordable<T> {
    return cloneWith(proxy, (value) => {
        if (isProxy(value)) {
            const nextValue = toRaw(value)
            return cloneDeep(nextValue)
        } else {
            return value
        }
    })
}

export function omitNil<T = any> (object: Recordable<T> | null | undefined): Recordable<T> {
    return omitBy(object, isEmpty)
}

export function omitUndefined<T = any> (object: Recordable<T> | null | undefined): Recordable<T> {
    return omitBy(object, isUndefined)
}

export function namePathToString (namePath: NamePath): string {
    if (namePath && isArray(namePath)) {
        const pathString = reduce(namePath, (total, value, index) => {
            const result = isNumber(value) && index > 0 ? `[${value}]` : `.${value}`
            return total + result
        }, '')
        return pathString.replace(/^\./, '')
    }
    return toString(namePath)
}

export function toPx (value?: number | string): string | undefined {
    return isNumber(value) ? `${value}px` : value
}
