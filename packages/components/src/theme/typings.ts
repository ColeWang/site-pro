import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import type { ThemeOverrideToken, ThemeToken } from '../ant-typings'

export const themeProviderProps = () => ({
    dark: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    compact: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    components: {
        type: Object as PropType<Partial<ThemeOverrideToken>>,
        default: () => ({})
    },
    token: {
        type: Object as PropType<Partial<ThemeToken>>,
        default: () => ({})
    },
    hashed: {
        type: Boolean as PropType<boolean>,
        default: undefined
    },
    inherit: {
        type: Boolean as PropType<boolean>,
        default: true
    }
})

export type ThemeProviderProps = Partial<ExtractPropTypes<ReturnType<typeof themeProviderProps>>>;

export interface ThemeProviderExpose {
    dark: Ref<boolean>;
    compact: Ref<boolean>;
}

export type ThemeProviderInstance = ComponentPublicInstance<ThemeProviderProps, ThemeProviderExpose>;
