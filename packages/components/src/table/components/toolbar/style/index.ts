import type { CSSInterpolation, FullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

interface ProTableToolbarToken extends FullToken<'ProTableToolbar'> {
    proTableToolbarSettingsPaddingLeft: number;
}

function genBaseStyle (token: ProTableToolbarToken): CSSInterpolation {
    const { componentCls, antCls, proTableToolbarSettingsPaddingLeft } = token
    return {
        [componentCls]: {
            position: 'relative',
            [`${componentCls}-popup-container`]: {
                position: 'relative',
                [`${antCls}-popover`]: {
                    paddingTop: 0
                },
                [`${antCls}-popover-arrow`]: {
                    display: 'none'
                },
                [`${antCls}-popover-inner-content`]: {
                    padding: `0 0 ${token.sizeXS}px`
                }
            },
            [`${componentCls}-container`]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBlock: token.sizeMS,
                overflow: 'hidden',
                [`${componentCls}-header`]: {
                    flex: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    [`${componentCls}-title`]: {
                        fontSize: token.fontSizeLG,
                        color: token.colorText,
                        lineHeight: token.lineHeightLG,
                        fontWeight: token.fontWeightStrong,
                        whiteSpace: 'nowrap',
                    },
                    [`${componentCls}-actions`]: {}
                },
                [`${componentCls}-settings`]: {
                    textAlign: 'end',
                    whiteSpace: 'nowrap',
                    paddingInlineStart: proTableToolbarSettingsPaddingLeft
                },
                [`&__word-wrap`]: {
                    display: 'block',
                    [`${componentCls}-header`]: {
                        marginBlockEnd: token.sizeMS
                    },
                    [`${componentCls}-settings`]: {
                        paddingInlineStart: 0
                    }
                }
            }
        }
    }
}

function styleFn (token: FullToken<'ProTableToolbar'>): CSSInterpolation {
    const proTableToolbarSettingsPaddingLeft: number = token.sizeMS / 2
    const proTableToolbarToken: ProTableToolbarToken = mergeToken<ProTableToolbarToken>(token, {
        proTableToolbarSettingsPaddingLeft
    })
    return genBaseStyle(proTableToolbarToken)
}

export default genComponentStyleHook('ProTableToolbar', styleFn)
