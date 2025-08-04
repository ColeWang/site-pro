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

export interface BaseSlot<T = any> {
    (...args: IfAny<T, any[], [T] | (T extends undefined ? [] : never)>): VNodeChild;
}

export interface BaseAttrs extends Recordable {
    style?: CSSProperties;
    class?: BaseClass;
}
