import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { descriptionsProps as antDescriptionsProps } from 'ant-design-vue/es/descriptions'
import { formItemProps as antFormItemProps } from 'ant-design-vue/es/form'
import type { Recordable } from '@site-pro/utils'
import { baseFieldProps } from '../base-field'
import type { TextCopyable, TextEllipsis } from '../ant-typings'

export interface DescriptionsRequest {
    (params: Recordable): Promise<any>;
}

const innerDescriptionsProps = () => ({
    ...antDescriptionsProps(),
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    }
})

export const descriptionsProps = () => ({
    ...innerDescriptionsProps(),
    request: {
        type: Function as PropType<DescriptionsRequest>,
        default: undefined
    },
    params: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    manualRequest: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    dataSource: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    onLoad: {
        type: Function as PropType<(dataSource: Recordable) => void>,
        default: undefined
    },
    onRequestError: {
        type: Function as PropType<(err: Error) => void>,
        default: undefined
    }
})

export interface DescriptionsSlots {
    default?: any;
    title?: any;
    extra?: any;
}

export type DescriptionsProps = Partial<ExtractPropTypes<ReturnType<typeof descriptionsProps>>>;

export interface DescriptionsExpose {
    reload: () => void;
}

export type DescriptionsInstance = ComponentPublicInstance<DescriptionsProps, DescriptionsExpose>;

export const descriptionsItemProps = () => ({
    ...baseFieldProps(),
    ...antFormItemProps(),
    span: {
        type: Number as PropType<number>,
        default: 1
    },
    ellipsis: {
        type: [Boolean, Object] as PropType<boolean | Omit<TextEllipsis, 'expandable' | 'rows' | 'onExpand'>>,
        default: undefined
    },
    copyable: {
        type: [Boolean, Object] as PropType<boolean | TextCopyable>,
        default: undefined
    },
    labelStyle: {
        type: Object as PropType<CSSProperties>,
        default: undefined
    },
    contentStyle: {
        type: Object as PropType<CSSProperties>,
        default: undefined
    }
})

export interface DescriptionsItemSlots extends Recordable {
    default?: any;
    label?: any;
    tooltip?: any;
}

export type DescriptionsItemProps = Partial<ExtractPropTypes<ReturnType<typeof descriptionsItemProps>>>;
export type DescriptionsItemInstance = ComponentPublicInstance<DescriptionsItemProps>;
