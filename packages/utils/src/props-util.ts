import type { VNode } from 'vue'
import { Fragment } from 'vue'
import { isArray, isFunction } from 'lodash-es'
import { isEmptyElement } from './is'

export function flattenChildren (children: Array<VNode | VNode[]>): Array<VNode> {
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

export function getSlot<T> (
    slots: Record<string, unknown>,
    props: Record<string, unknown>,
    name: string = 'default'
): T | false {
    const result: any = props[name] || slots[name]
    return isFunction(result) ? result as T : false
}

export function getSlotVNode<T> (
    slots: Record<string, unknown>,
    props: Record<string, unknown>,
    name: string = 'default',
    slotScope?: Record<string, unknown>
): T | false {
    const result: any = props[name] || slots[name]
    return isFunction(result) ? result(slotScope) as T : false
}

export function getPropsSlot<T> (
    slots: Record<string, unknown>,
    props: Record<string, unknown>,
    name: string = 'default',
    slotScope?: Record<string, unknown>
): T | false {
    const result: any = props[name] ?? slots[name]
    return isFunction(result) ? result(slotScope) as T : (result || false)
}
