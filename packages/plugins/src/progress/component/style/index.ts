import type { FullToken } from 'ant-design-vue/es/theme/internal'
import { genComponentStyleHook, mergeToken } from 'ant-design-vue/es/theme/internal'
import type { CSSInterpolation } from 'ant-design-vue/es/_util/cssinjs'

interface ProProgressPluginToken extends FullToken<'ProProgressPlugin'> {
    // --
}

function genBaseStyle (token: ProProgressPluginToken): CSSInterpolation {
    const { componentCls } = token
    return {
        [componentCls]: {
            pointerEvents: 'none',
            [`${componentCls}-bar`]: {
                position: 'fixed',
                insetBlockStart: 0,
                insetInline: 0,
                zIndex: token.zIndexPopupBase + 31,
                width: '100%',
                height: token.sizeXXS / 2,
                backgroundColor: token.colorPrimary
            }
        }
    }
}

function styleFn (token: FullToken<'ProProgressPlugin'>): CSSInterpolation {
    const proProgressPluginToken = mergeToken<ProProgressPluginToken>(token, {})
    return genBaseStyle(proProgressPluginToken)
}

export default genComponentStyleHook('ProProgressPlugin', styleFn)
