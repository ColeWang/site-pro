import type { VNode, VNodeChild } from 'vue'
import type { BadgeProps } from 'ant-design-vue'

export interface Dictionary<T> {
    [key: string]: T;
}

export type Recordable<T = any> = Record<string, T>;

export interface ExtraDisabled {
    disabled?: boolean;

    [name: string]: any;
}

export type BaseNamePath = string | number | (string | number)[];

export type BaseVueNode = VNode | VNodeChild | JSX.Element | string | number | null | undefined;

export interface BaseFieldNames {
    label?: string;
    value?: string;
    children?: string;
}

export interface BaseOption extends ExtraDisabled {
    label?: any;
    value?: string | number | null;
    children?: Omit<BaseOption, 'children'>[];
}

export interface BaseValueEnum {
    [key: string]: string | BadgeProps & ExtraDisabled;
}
