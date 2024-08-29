import { Comment, Fragment } from 'vue'
import { isEqual, isFunction, isNaN, isNil, isObject, isSymbol } from 'lodash-es'

export function isValidElement (value: any): boolean {
    return value && value.__v_isVNode && !isSymbol(value.type)
}

export function isEmptyElement (value: any): boolean {
    const isEmptyText = value && value.type === Text && value.children.trim() === ''
    const isEmptyFragment = value && value.type === Fragment && value.children.length === 0
    return value && (value.type === Comment || isEmptyText || isEmptyFragment)
}

export function isPromise<T = any> (value: any): value is Promise<T> {
    return isObject(value) && isFunction((value as Record<any, any>).then) && isFunction((value as Record<any, any>).catch)
}

export function isEmpty (value: any): value is '' | null | undefined {
    return isEqual(value, '') || isNil(value) || isNaN(value)
}

export function isEmptyObject (object: Record<string, any>): boolean {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return false
        }
    }
    return true
}
