import type { CSSInterpolation, ThemeFullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProAction?: {};
    }
}


interface ProActionToken extends ThemeFullToken<'ProAction'> {
    proActionTransition: string;
}

function genBaseStyle (token: ProActionToken): CSSInterpolation {
    const { componentCls, proActionTransition } = token
    return {
        [componentCls]: {
            display: 'inline-block',
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            color: token.colorText,
            transition: proActionTransition,
            textDecoration: 'none',
            outline: 'none',
            cursor: 'pointer',
            userSelect: 'none',
            [`&-primary`]: {
                color: token.colorLink,
                [`&:hover`]: {
                    color: token.colorLinkHover
                },
                [`&:active`]: {
                    color: token.colorLinkActive
                }
            },
            [`&-warning`]: {
                color: token.colorWarning,
                [`&:hover`]: {
                    color: token.colorWarningHover
                },
                [`&:active`]: {
                    color: token.colorWarningActive
                }
            },
            [`&-error`]: {
                color: token.colorError,
                [`&:hover`]: {
                    color: token.colorErrorHover
                },
                [`&:active`]: {
                    color: token.colorErrorActive
                }
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProAction'>): CSSInterpolation {
    const proActionTransition: string = `all ${token.motionDurationMid} ${token.motionEaseInOut}`

    const proActionToken: ProActionToken = mergeToken<ProActionToken>(token, {
        proActionTransition
    })
    return genBaseStyle(proActionToken)
}


export default genComponentStyleHook('ProAction', styleFn)
