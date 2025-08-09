import type { CSSInterpolation, ThemeFullToken } from '@site-pro/components'
import { genComponentStyleHook, mergeToken } from '@site-pro/components'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProLayoutSidebar?: {};
    }
}

interface ProLayoutSidebarToken extends ThemeFullToken<'ProLayoutSidebar'> {
    proLayoutSidebarLogoHeight: number;
    proLayoutSidebarLightBg: string;
}

function genBaseStyle (token: ProLayoutSidebarToken): CSSInterpolation {
    const { componentCls, antCls, proLayoutSidebarLogoHeight, proLayoutSidebarLightBg } = token
    return {
        [componentCls]: {
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            userSelect: 'none',
            [`&-light`]: {
                background: proLayoutSidebarLightBg,
                borderInlineEnd: `1px solid ${token.colorSplit}`
            },
            [`${componentCls}-space`]: {
                height: '100%',
                paddingBlockStart: 0.1,
                marginBlockStart: -0.1,
                overflowY: 'auto',
                willChange: 'scroll-position',
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
                '-webkit-overflow-scrolling': 'touch',
                [`&::-webkit-scrollbar`]: {
                    width: 0,
                    height: 0,
                    display: 'none'
                },
                [`${componentCls}-content`]: {
                    position: 'relative',
                    [`${componentCls}-logo`]: {
                        height: proLayoutSidebarLogoHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    [`${antCls}-menu-light`]: {
                        borderInlineEnd: 'none'
                    }
                }
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProLayoutSidebar'>): CSSInterpolation {
    const proLayoutSidebarLogoHeight: number = token.controlHeight + token.sizeMS * 2
    const proLayoutSidebarLightBg: string = token.colorBgContainer

    const proLayoutSidebarToken: ProLayoutSidebarToken = mergeToken<ProLayoutSidebarToken>(token, {
        proLayoutSidebarLogoHeight,
        proLayoutSidebarLightBg
    })
    return genBaseStyle(proLayoutSidebarToken)
}

export default genComponentStyleHook('ProLayoutSidebar', styleFn)
