import type { ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { Route } from 'vitepress'
import type { BaseSlot } from '@site-pro/utils'

export interface SidebarItem {
    text: string;
    link?: string;
    items?: SidebarItem[];
}

export const sidebarProps = () => ({
    route: {
        type: Object as PropType<Route>,
        default: () => ({})
    },
    menus: {
        type: Array as PropType<SidebarItem[]>,
        default: () => ([])
    },
    logo: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    styleFn: {
        type: Function as PropType<(width: number) => CSSProperties>,
        default: undefined
    },
    onChange: {
        type: Function as PropType<(key: string) => void>,
        default: undefined
    }
})

export interface SidebarSlots {
    logo?: any;
}

export type SidebarProps = Partial<ExtractPropTypes<ReturnType<typeof sidebarProps>>>;
export type SidebarInstance = ComponentPublicInstance<SidebarProps>;
