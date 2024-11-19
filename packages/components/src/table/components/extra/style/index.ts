import type { CSSInterpolation, FullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

interface ProTableExtraToken extends FullToken<'ProTableExtra'> {
    proTableExtraMarginBottom: number;
}

function genBaseStyle (token: ProTableExtraToken): CSSInterpolation {
    const { componentCls, proTableExtraMarginBottom } = token
    return {
        [componentCls]: {
            marginBlockEnd: proTableExtraMarginBottom,
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {}
        }
    }
}

function styleFn (token: FullToken<'ProTableExtra'>): CSSInterpolation {
    const proTableExtraMarginBottom = token.sizeMS
    const proTableExtraToken = mergeToken<ProTableExtraToken>(token, {
        proTableExtraMarginBottom
    })
    return genBaseStyle(proTableExtraToken)
}

export default genComponentStyleHook('ProTableExtra', styleFn)
