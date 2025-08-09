import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export const navbarProps = () => ({
    open: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    onUpdateOpen: {
        type: Function as PropType<(value: boolean) => void>,
        default: undefined
    }
})

export type NavbarProps = Partial<ExtractPropTypes<ReturnType<typeof navbarProps>>>;
export type NavbarInstance = ComponentPublicInstance<NavbarProps>;
