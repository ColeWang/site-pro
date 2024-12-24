import { isProxy, toRaw } from 'vue'
import { cloneDeep, cloneWith, isArray, isNumber, isObject, isUndefined, omitBy, reduce, toString } from 'lodash-es'
import type { NamePath, Recordable } from './types'
import { isEmpty } from './is'

export function safeDestructureObject<T = any> (value: T, defaultValue?: Recordable): Recordable {
    return isObject(value) ? value : (defaultValue || {})
}

export function cloneProxyToRaw<T extends Recordable> (object?: T): T {
    const needObject: Recordable = safeDestructureObject(object)
    return cloneWith({ ...needObject } as T, (value) => {
        if (isProxy(value)) {
            return cloneDeep(toRaw(value))
        } else {
            return value
        }
    })
}

export function omitNil<T extends Recordable> (object?: T): T {
    return omitBy(object || {}, isEmpty) as T
}

export function omitUndefined<T extends Recordable> (object?: T): T {
    return omitBy(object || {}, isUndefined) as T
}

export function namePathToString (namePath: NamePath): string {
    if (namePath && isArray(namePath)) {
        const pathString: string = reduce(namePath, (total, value, index) => {
            const result: string = isNumber(value) && index > 0 ? `[${value}]` : `.${value}`
            return total + result
        }, '')
        return pathString.replace(/^\./, '')
    }
    return toString(namePath)
}

export function toPx (value?: number | string): string | undefined {
    return isNumber(value) ? `${value}px` : value
}
