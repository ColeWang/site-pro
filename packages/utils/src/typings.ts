import type { ComponentPublicInstance, Ref } from 'vue'

export type TargetType = ComponentPublicInstance | Element | null;

export type BasicTarget = TargetType | Ref<TargetType>;

export interface Dictionary<T> {
    [key: string]: T;
}

interface BadgeProps {
    color: string;
}

export interface BasicValueEnum {
    [key: string]: string | BadgeProps;
}
