import { h } from 'vue'
import { Badge, Space } from 'ant-design-vue'
import { compact, isArray, isNumber, isObject, isString, map, reduce, set } from 'lodash-es'
import type { DefaultOptionType, DefaultValueEnum } from './typings'
import { isEmpty } from './is'

export function valueEnumToOptions (valueEnum: DefaultValueEnum = {}): DefaultOptionType[] {
    const options = map(valueEnum, (value, key) => {
        if (isEmpty(value)) return value
        if (isObject(value) && value.text) {
            const { text, disabled } = value
            return { value: key, label: text, disabled }
        }
        return { value: key, label: value }
    })
    return compact(options)
}

export function optionsToValueEnum (
    options: DefaultOptionType[] = [],
    fieldNames: Record<keyof DefaultOptionType, string>
): DefaultValueEnum {
    const { value = 'value', label = 'label', children = 'children' } = fieldNames || {}
    const traverseOptions = (values: DefaultOptionType[] = [], result: DefaultValueEnum) => {
        return reduce(values, (_, option = {}) => {
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
    return traverseOptions(options, {})
}

export type BaseTextType = string | number | DefaultOptionType | null | undefined;

export function valueEnumToText (
    text?: BaseTextType | BaseTextType[],
    valueEnum: DefaultValueEnum = {}
) {
    if (isEmpty(text)) return text
    if (isArray(text)) {
        const children = compact(text).map((value) => {
            return valueEnumToText(value, valueEnum)
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
    return isObject(text) ? text.label : text
}
