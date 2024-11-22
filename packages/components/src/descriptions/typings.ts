import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { descriptionsProps as antDescriptionsProps } from 'ant-design-vue/es/descriptions'
import { formItemProps } from 'ant-design-vue/es/form'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { baseFieldProps } from '../base-field'
import type { TableColumn } from '../table'

export interface DescriptionsRequest {
    (params: Recordable): Promise<any>;
}

export type DescriptionsColumn = DescriptionsItemProps & TableColumn & {
    __SLOTS__?: Recordable<BaseSlot>;
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
    columns: {
        type: Array as PropType<DescriptionsColumn[]>,
        default: () => ([])
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
    ...formItemProps(),
    prefixCls: {
        type: String as PropType<string>,
        default: undefined
    },
    label: {
        type: [String, Number, Array, Object, Function] as PropType<string>,
        default: undefined
    },
    labelStyle: {
        type: Object as PropType<CSSProperties>,
        default: undefined
    },
    contentStyle: {
        type: Object as PropType<CSSProperties>,
        default: undefined
    },
    span: {
        type: Number as PropType<any>,
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
}

export type DescriptionsItemProps = Partial<ExtractPropTypes<ReturnType<typeof descriptionsItemProps>>>;
export type DescriptionsItemInstance = ComponentPublicInstance<DescriptionsItemProps>;
