import type { CSSInterpolation, ThemeFullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProTableAlert?: {};
    }
}

interface ProTableAlertToken extends ThemeFullToken<'ProTableAlert'> {
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

function styleFn (token: ThemeFullToken<'ProTableAlert'>): CSSInterpolation {
    const proTableAlertMarginBottom: number = token.sizeMS
    const proTableAlertToken: ProTableAlertToken = mergeToken<ProTableAlertToken>(token, {
        proTableAlertMarginBottom
    })
    return genBaseStyle(proTableAlertToken)
}

export default genComponentStyleHook('ProTableAlert', styleFn)
