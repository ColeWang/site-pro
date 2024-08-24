import { genComponentStyleHook, mergeToken } from 'ant-design-vue/es/theme/internal'

export { mergeToken, genComponentStyleHook }

export type { FullToken, GenerateStyle } from 'ant-design-vue/es/theme/internal'

declare module 'ant-design-vue/es/theme/interface' {
    interface ComponentTokenMap {
        ProDescriptions?: {},
        ProFieldTextarea?: {},
        ProBaseForm?: {}
    }
}
