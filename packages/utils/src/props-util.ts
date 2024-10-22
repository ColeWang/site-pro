import type { VNode, VNodeChild } from 'vue'
import { Fragment } from 'vue'
import { isArray, isFunction } from 'lodash-es'
import type { BaseSlot, Recordable } from './types'
import { isEmptyElement } from './is'

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
): Slot | false {
    const result: any = props[name] || slots[name]
    return isFunction(result) ? result as Slot : false
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
): T | false {
    const result: any = props[name] ?? slots[name]
    return isFunction(result) ? result(slotScope) as T : (result || false)
}
