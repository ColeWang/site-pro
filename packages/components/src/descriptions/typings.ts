import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { descriptionsProps as antDescriptionsProps } from 'ant-design-vue/es/descriptions'
import type { NamePath, Recordable } from '@site-pro/utils'
import { baseFieldProps } from '../base-field'

export interface DescriptionsRequest {
    (params: Recordable): Promise<any>;
}

export const descriptionsProps = () => ({
    ...antDescriptionsProps(),
    request: {
        type: Function as PropType<DescriptionsRequest>,
        default: undefined
    },
    params: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    dataSource: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
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
    label: {
        type: [String, Number, Array, Object, Function] as PropType<string>,
        default: undefined
    },
    name: {
        type: [String, Number, Array] as PropType<NamePath>,
        default: undefined
    },
    labelStyle: {
        type: Object as PropType<CSSProperties>,
        default: undefined
    },
    prefixCls: {
        type: String as PropType<string>,
        default: undefined
    },
    contentStyle: {
        type: Object as PropType<CSSProperties>,
        default: undefined
    },
    span: {
        type: Number as PropType<number>,
        default: 1
    },
    hide: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    order: {
        type: Number as PropType<number>,
        default: undefined
    }
})

export interface DescriptionsItemSlots {
    default?: any;
    label?: any;
}

export type DescriptionsItemProps = Partial<ExtractPropTypes<ReturnType<typeof descriptionsItemProps>>>;
export type DescriptionsItemInstance = ComponentPublicInstance<DescriptionsItemProps>;
