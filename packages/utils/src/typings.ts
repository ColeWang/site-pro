import type { BadgeProps } from 'ant-design-vue'

export interface Dictionary<T> {
    [key: string]: T;
}

export type BaseNamePath = string | number | (string | number)[];

export interface BaseOptionType {
    disabled?: boolean;

    [name: string]: any;
}

export interface DefaultOptionType extends BaseOptionType {
    label?: any;
    value?: string | number | null;
    children?: Omit<DefaultOptionType, 'children'>[];
}

export interface DefaultValueEnum {
    [key: string]: string | BadgeProps & BaseOptionType;
}
