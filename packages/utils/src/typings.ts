import type { BadgeProps } from 'ant-design-vue'

export interface Dictionary<T> {
    [key: string]: T;
}

export type BaseNamePath = string | number | (string | number)[];

export interface BaseValueEnum {
    [key: string]: string | BadgeProps;
}
