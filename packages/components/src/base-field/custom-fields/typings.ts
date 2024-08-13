import type { Slot, VNode, VNodeChild } from 'vue'
import type { BaseFieldProps } from '../typings.ts'

export interface CustomFieldsParams {
    props: BaseFieldProps;
    slots: Record<string, Slot | undefined>;
}

export type CustomRenderNode = VNode
    | VNodeChild
    | VNode[]
    | Slot
    | ((...props: any[]) => Slot)
    | ((...props: any[]) => VNode)
    | JSX.Element
    | string
    | null
    | undefined;

export interface BaseValueTypeMap {
    [key: string]: (params: CustomFieldsParams) => CustomRenderNode;
}
