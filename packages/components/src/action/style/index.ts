import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

interface ProActionToken extends FullToken<'ProAction'> {
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

function styleFn (token: FullToken<'ProAction'>): CSSInterpolation {
    const proActionTransition = `all ${token.motionDurationMid} ${token.motionEaseInOut}`

    const proActionToken = mergeToken<ProActionToken>(token, {
        proActionTransition
    })
    return genBaseStyle(proActionToken)
}


export default genComponentStyleHook('ProAction', styleFn)
