import type { CSSInterpolation, FullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

interface ProTableAlertToken extends FullToken<'ProTableAlert'> {
    proTableAlertMarginBottom: number;
}

function genBaseStyle (token: ProTableAlertToken): CSSInterpolation {
    const { componentCls, proTableAlertMarginBottom } = token
    return {
        [componentCls]: {
            marginBlockEnd: proTableAlertMarginBottom,
            border: 'none',
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: token.lineHeight,
                paddingBlock: token.sizeSM,
                paddingInline: token.sizeSM,
                backgroundColor: token.colorFillQuaternary,
                borderRadius: token.borderRadius,
                [`${componentCls}-wrapper`]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: token.colorTextSecondary,
                    overflow: 'hidden',
                    [`${componentCls}-content`]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        whiteSpace: 'nowrap'
                    },
                    [`${componentCls}-options`]: {
                        paddingInlineStart: token.size,
                        whiteSpace: 'nowrap'
                    }
                }
            }
        }
    }
}

function styleFn (token: FullToken<'ProTableAlert'>): CSSInterpolation {
    const proTableAlertMarginBottom = token.sizeMS
    const proTableAlertToken = mergeToken<ProTableAlertToken>(token, {
        proTableAlertMarginBottom
    })
    return genBaseStyle(proTableAlertToken)
}

export default genComponentStyleHook('ProTableAlert', styleFn)
