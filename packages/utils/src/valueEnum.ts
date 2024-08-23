import type { VNodeChild } from 'vue'
import { h, isVNode } from 'vue'
import { Badge, Space } from 'ant-design-vue'
import { compact, isArray, isNumber, isObject, isString, map, reduce, set } from 'lodash-es'
import { isEmpty } from './is'
import type { BaseEnumType, BaseFieldNames, BaseOptionType } from './typings'

export function enumToOptions<E extends BaseEnumType, O extends BaseOptionType> (valueEnum?: E): Array<O> {
    const result = map(valueEnum || ({} as E), (item, key) => {
        if (isEmpty(item)) return item
        if (isObject(item) && item.text) {
            const { text, disabled } = item
            return { value: key, label: text, disabled }
        }
        return { value: key, label: item }
    })
    return compact(result) as Array<O>
}

export function optionsToEnum<O extends BaseOptionType, E extends BaseEnumType> (options?: Array<O>, fieldNames?: BaseFieldNames): E {
    const { value = 'value', label = 'label', children = 'children' } = fieldNames || {}

    const traverseOptions = (values: Array<O> = [], result: E) => {
        return reduce(values, (_, option) => {
            const key = option[value], text = option[label]
            if (!(isEmpty(key) || isEmpty(text))) {
                set(result, key, text)
            }
            const curChildren = option[children]
            if (isArray(curChildren) && curChildren.length !== 0) {
                traverseOptions(curChildren, result)
            }
            return result
        }, result)
    }

    return traverseOptions(options || [], {} as E)
}

export function enumToText<T extends BaseOptionType | VNodeChild> (text: T, valueEnum: BaseEnumType): VNodeChild {
    if (isEmpty(text) || isVNode(text)) return text
    if (isObject(text) && (text as BaseOptionType).label) return (text as BaseOptionType).label
    if (isArray(text)) {
        const children = compact(text).map((value) => {
            return enumToText(value, valueEnum)
        })
        return h(Space, { size: 2, wrap: true }, {
            default: () => children,
            split: () => ','
        })
    }
    if (isString(text) || isNumber(text)) {
        const plain = valueEnum[text]
        if (plain && isObject(plain)) {
            return h(Badge, { ...plain })
        }
        return isEmpty(plain) ? text : plain
    }
    return text as VNodeChild
}
