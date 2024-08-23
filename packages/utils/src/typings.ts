import type { VNodeChild } from 'vue'

export interface Dictionary<T = any> {
    [key: string]: T;
}

export type Recordable<T = any> = Record<string, T>;

export type BaseNamePath = string | number | (string | number)[];

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

export interface BaseSlot<T extends any = any> {
    (...args: IfAny<T, any[], [T] | (T extends undefined ? [] : never)>): VNodeChild | JSX.Element;
}

export interface BaseFieldNames extends Dictionary {
    value?: string;
    label?: string;
    children?: string;
}

export type LiteralUnion<T extends string> = T | (string & {});

export interface BaseBadgeType extends Dictionary {
    text?: any;
    value?: string | number;
    status?: 'error' | 'default' | 'success' | 'processing' | 'warning';
    color?: LiteralUnion<'blue' | 'cyan' | 'gold' | 'green' | 'lime' | 'magenta' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow' | 'volcano' | 'geekblue'>;
    disabled?: boolean;
}

export interface BaseEnumType {
    [key: string]: string | number | BaseBadgeType;
}

export interface BaseOptionType extends Dictionary {
    label?: any;
    value?: string | number;
    disabled?: boolean;
    children?: BaseOptionType[];
}
