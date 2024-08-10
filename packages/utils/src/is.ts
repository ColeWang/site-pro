import { Comment, Fragment } from 'vue'
import { isEqual, isFunction, isNaN, isNil, isObject, isSymbol } from 'lodash-es'

export function isValidElement (c: any) {
    return c && c.__v_isVNode && !isSymbol(c.type)
}

export function isEmptyElement (c: any) {
    const isEmptyText = c && c.type === Text && c.children.trim() === ''
    const isEmptyFragment = c && c.type === Fragment && c.children.length === 0
    return c && (c.type === Comment || isEmptyText || isEmptyFragment)
}

export function isPromise<T = any> (value: unknown): value is Promise<T> {
    return isObject(value) && isFunction((value as Record<any, any>).then) && isFunction((value as Record<any, any>).catch)
}

export function isEmpty (value: unknown): value is '' | null | undefined | number {
    return isEqual(value, '') || isNil(value) || isNaN(value)
}

export function isEmptyObject (object: Record<string, unknown> = {}): boolean {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return false
        }
    }
    return true
}
