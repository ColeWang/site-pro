import type { CSSInterpolation, ThemeFullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProQueryFilter?: {};
    }
}

interface ProQueryFilterToken extends ThemeFullToken<'ProQueryFilter'> {
    proQueryFilterVerticalMargin: number;
}

function genBaseStyle (token: ProQueryFilterToken): CSSInterpolation {
    const { componentCls, antCls, proQueryFilterVerticalMargin } = token
    return {
        [componentCls]: {
            [`${antCls}-form-item`]: {
                marginBlock: 0
            },
            [`${componentCls}-form-item__vertical`]: {
                marginBlockStart: proQueryFilterVerticalMargin
            },
            [`${componentCls}-action-col`]: {
                textAlign: 'end'
            },
            [`${componentCls}-col-hidden`]: {
                display: 'none'
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProQueryFilter'>): CSSInterpolation {
    const proQueryFilterVerticalMargin: number = token.fontSize * token.lineHeight + token.sizeXS

    const proQueryFilterToken: ProQueryFilterToken = mergeToken<ProQueryFilterToken>(token, {
        proQueryFilterVerticalMargin
    })
    return genBaseStyle(proQueryFilterToken)
}

export default genComponentStyleHook('ProQueryFilter', styleFn)
