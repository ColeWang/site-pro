import type { CSSInterpolation, FullToken } from '@site-pro/components'
import { genComponentStyleHook, mergeToken } from '@site-pro/components'

interface ProPluginProgressToken extends FullToken<'ProPluginProgress'> {
    // --
}

function genBaseStyle (token: ProPluginProgressToken): CSSInterpolation {
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

function styleFn (token: FullToken<'ProPluginProgress'>): CSSInterpolation {
    const proPluginProgressToken = mergeToken<ProPluginProgressToken>(token, {})
    return genBaseStyle(proPluginProgressToken)
}

export default genComponentStyleHook('ProPluginProgress', styleFn)
