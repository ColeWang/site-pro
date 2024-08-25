import { genComponentStyleHook, mergeToken } from 'ant-design-vue/es/theme/internal'

export { mergeToken, genComponentStyleHook }

export type { FullToken } from 'ant-design-vue/es/theme/internal'
export type { CSSInterpolation } from 'ant-design-vue/es/_util/cssinjs'

declare module 'ant-design-vue/es/theme/interface' {
    interface ComponentTokenMap {
        ProDescriptions?: {},
        ProFieldTextarea?: {},
        ProBaseForm?: {}
    }
}
