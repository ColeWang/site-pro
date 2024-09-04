import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

interface ProQueryFilterToken extends FullToken<'ProQueryFilter'> {
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

function styleFn (token: FullToken<'ProQueryFilter'>): CSSInterpolation {
    const proQueryFilterVerticalMargin = token.fontSize * token.lineHeight + token.sizeXS

    const proQueryFilterToken = mergeToken<ProQueryFilterToken>(token, {
        proQueryFilterVerticalMargin
    })
    return genBaseStyle(proQueryFilterToken)
}

export default genComponentStyleHook('ProQueryFilter', styleFn)
