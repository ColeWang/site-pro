import type { CSSInterpolation, ThemeFullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProTableExtra?: {};
    }
}

interface ProTableExtraToken extends ThemeFullToken<'ProTableExtra'> {
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

function styleFn (token: ThemeFullToken<'ProTableExtra'>): CSSInterpolation {
    const proTableExtraMarginBottom: number = token.sizeMS
    const proTableExtraToken: ProTableExtraToken = mergeToken<ProTableExtraToken>(token, {
        proTableExtraMarginBottom
    })
    return genBaseStyle(proTableExtraToken)
}

export default genComponentStyleHook('ProTableExtra', styleFn)
