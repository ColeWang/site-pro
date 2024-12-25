import type { VNode, VNodeChild } from 'vue'
import { Fragment } from 'vue'
import { get, isArray, isFunction, isUndefined, reduce, set } from 'lodash-es'
import type { BaseSlot, Recordable } from './types'
import { isEmptyElement } from './is'

export function convertToCamelCaseProps<T extends Recordable> (props: T): T {
    const regExp: RegExp = /-([a-z])/g

    return reduce(props, (result, value, key) => {
        const camelCaseKey: string = key.replace(regExp, (_, char) => {
            return char.toUpperCase()
        })

        const originValue: any = get(props, camelCaseKey, undefined)
        const nextValue: any = isUndefined(originValue) ? value : originValue

        return set(result, camelCaseKey, nextValue)
    }, {} as T)
}

export function flatVNodeChildren (children?: VNode[]): VNode[] {
    const result: Array<VNode> = reduce(children || [], (accumulator, child) => {
        if (child && isArray(child)) {
            accumulator.push(...child)
        } else if (child && child.type === Fragment && isArray(child.children)) {
            accumulator.push(...flatVNodeChildren(child.children as Array<VNode>))
        } else if (child) {
            accumulator.push(child)
        }
        return accumulator
    }, [] as any)

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
    slotProps?: Recordable
): T | undefined {
    const result: any = props[name] || slots[name]
    return isFunction(result) ? result(slotProps) as T : undefined
}

export function getPropsSlotVNode<T extends VNodeChild> (
    slots: Recordable,
    props: Recordable,
    name: string = 'default',
    slotProps?: Recordable
): T | undefined {
    const result: any = props[name] ?? slots[name]
    return isFunction(result) ? result(slotProps) as T : (result || undefined)
}
