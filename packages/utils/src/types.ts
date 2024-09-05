import type { ComponentPublicInstance, CSSProperties, VNodeChild } from 'vue'

export type Recordable<T = any> = Record<string, T>;

export type NamePath = string | number | (string | number)[];

export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export type IfUnknown<T, Y, N> = T extends unknown ? Y : N;
export type IfNever<T, Y, N> = T extends never ? Y : N;

export type Merge<A, B> = Omit<Omit<A, keyof B> & B, never>;

export type LiteralUnion<T extends string> = T | (string & {});

export type BaseRefType = HTMLElement | ComponentPublicInstance | null;

export type BaseClass = string | Recordable<boolean> | Array<BaseClass>;

export interface BaseSlot<T extends any = any> {
    (...args: IfAny<T, any[], [T] | (T extends undefined ? [] : never)>): VNodeChild;
}

export interface BaseAttrs extends Recordable {
    style?: CSSProperties;
    class?: BaseClass;
}

export interface BaseFieldNames extends Recordable {
    value?: string;
    label?: string;
    children?: string;
}

export interface BaseBadgeType extends Recordable {
    text?: any;
    value?: string | number;
    status?: 'error' | 'default' | 'success' | 'processing' | 'warning';
    color?: LiteralUnion<'blue' | 'cyan' | 'gold' | 'green' | 'lime' | 'magenta' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow' | 'volcano' | 'geekblue'>;
    disabled?: boolean;
}

export interface BaseEnumType {
    [key: string]: string | number | BaseBadgeType;
}

export interface BaseOptionType extends Recordable {
    label?: any;
    value?: string | number;
    disabled?: boolean;
    children?: BaseOptionType[];
}
