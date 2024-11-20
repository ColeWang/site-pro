import type { VNode, VNodeChild } from 'vue'
import { Fragment } from 'vue'
import { isArray, isFunction, isUndefined } from 'lodash-es'
import type { BaseSlot, Recordable } from './types'
import { isEmptyElement } from './is'

export function getPropByKebabOrCamel<T = any> (props: Recordable<T>, kebabCaseKey: string): T | undefined {
    const regExp: RegExp = /-([a-z])/g
    const camelCaseKey: string = kebabCaseKey.replace(regExp, (_, char) => {
        return char.toUpperCase()
    })
    const value: T | undefined = (props as any)[kebabCaseKey] as T
    return isUndefined(value) ? props[camelCaseKey] : value
}

export function flattenChildren (children?: VNode[]): VNode[] {
    const result: Array<VNode> = []
    if (isArray(children) && children.length !== 0) {
        children.forEach((child) => {
            if (child && isArray(child)) {
                result.push(...child)
            } else if (child && child.type === Fragment && isArray(child.children)) {
                result.push(...flattenChildren(child.children as Array<VNode>))
            } else if (child) {
                result.push(child)
            }
        })
    }
    return result.filter((c) => !isEmptyElement(c))
}

export function getSlot<T = any, Slot = BaseSlot<T>> (
    slots: Recordable,
    props: Recordable,
    name: string = 'default'
): Slot | undefined {
    const result: any = props[name] || slots[name]
    return isFunction(result) ? result as Slot : undefined
}

export function getSlotVNode<T extends VNodeChild> (
    slots: Recordable,
    props: Recordable,
    name: string = 'default',
    slotScope?: Recordable
): T | false {
    const result: any = props[name] || slots[name]
    return isFunction(result) ? result(slotScope) as T : false
}

export function getPropsSlot<T extends VNodeChild> (
    slots: Recordable,
    props: Recordable,
    name: string = 'default',
    slotScope?: Recordable
): T | undefined {
    const result: any = props[name] ?? slots[name]
    return isFunction(result) ? result(slotScope) as T : (result || undefined)
}
