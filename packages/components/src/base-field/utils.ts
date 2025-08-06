import type { VNodeChild } from 'vue'
import { createVNode, isVNode } from 'vue'
import { Badge as AntBadge, Space as AntSpace } from 'ant-design-vue'
import { isEmpty, omitNil } from '@site-pro/utils'
import { compact, isArray, isNumber, isObject, isString } from 'lodash-es'
import type { BaseFieldOption, BaseFieldValueEnum } from './typings'

export function baseFieldParsingText (text: any, valueEnum?: BaseFieldValueEnum): VNodeChild {
    const needValueEnum: BaseFieldValueEnum = omitNil(valueEnum)
    // VNode
    if (isVNode(text) || isEmpty(text)) return text

    if (isArray(text)) {
        const children: VNodeChild[] = compact(text).map((value) => {
            return baseFieldParsingText(value, needValueEnum)
        })
        return createVNode(AntSpace, { size: 2, wrap: true }, {
            default: () => children,
            split: () => ','
        })
    }
    if (isObject(text) && !isArray(text)) {
        return (text as BaseFieldOption).label
    }
    if (isString(text) || isNumber(text)) {
        const plain: any = needValueEnum[text]
        if (plain && isObject(plain)) {
            return createVNode(AntBadge, { ...plain })
        }
        return isEmpty(plain) ? text : plain
    }

    return text as VNodeChild
}
