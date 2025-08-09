import type { CSSInterpolation, ThemeFullToken } from '@site-pro/components'
import { genComponentStyleHook, mergeToken } from '@site-pro/components'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProLayoutNavbar?: {};
    }
}

interface ProLayoutNavbarToken extends ThemeFullToken<'ProLayoutNavbar'> {
    proLayoutNavbarHeight: number;
    proLayoutNavbarPaddingInline: number;
    proLayoutNavbarCollapseSize: number;
}

function genBaseStyle (token: ProLayoutNavbarToken): CSSInterpolation {
    const { componentCls, proLayoutNavbarHeight, proLayoutNavbarPaddingInline, proLayoutNavbarCollapseSize } = token
    return {
        [componentCls]: {
            position: 'relative',
            userSelect: 'none',
            ['&:after']: {
                position: 'absolute',
                left: 0,
                right: 0,
                content: '""',
                borderBottom: `1px solid ${token.colorSplit}`
            },
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-content`]: {
                height: proLayoutNavbarHeight,
                display: 'flex',
                justifyContent: 'space-between',
                paddingInline: proLayoutNavbarPaddingInline,
                background: token.colorBgContainer,
                [`${componentCls}-left, ${componentCls}-right`]: {
                    height: proLayoutNavbarHeight,
                    display: 'flex',
                    alignItems: 'center'
                },
                [`${componentCls}-menu`]: {
                    width: proLayoutNavbarCollapseSize,
                    height: proLayoutNavbarCollapseSize,
                    fontSize: proLayoutNavbarCollapseSize,
                    lineHeight: `${proLayoutNavbarCollapseSize}px`,
                    color: token.colorText,
                    textAlign: 'center',
                    cursor: 'pointer',
                    [`&:hover`]: {
                        color: token.colorPrimaryHover
                    },
                    [`&:active`]: {
                        color: token.colorPrimaryActive
                    }
                }
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProLayoutNavbar'>): CSSInterpolation {
    const proLayoutNavbarHeight: number = token.controlHeight + token.fontSize * token.lineHeight
    const proLayoutNavbarPaddingInline: number = token.controlHeight / 2
    const proLayoutNavbarCollapseSize: number = proLayoutNavbarHeight / 2

    const proLayoutNavbarToken: ProLayoutNavbarToken = mergeToken<ProLayoutNavbarToken>(token, {
        proLayoutNavbarHeight,
        proLayoutNavbarPaddingInline,
        proLayoutNavbarCollapseSize
    })
    return genBaseStyle(proLayoutNavbarToken)
}

export default genComponentStyleHook('ProLayoutNavbar', styleFn)
