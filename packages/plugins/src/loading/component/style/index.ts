import type { FullToken } from 'ant-design-vue/es/theme/internal'
import { genComponentStyleHook, mergeToken } from 'ant-design-vue/es/theme/internal'
import type { CSSInterpolation } from 'ant-design-vue/es/_util/cssinjs'

declare module 'ant-design-vue/es/theme/interface' {
    interface ComponentTokenMap {
        ProLoadingPlugin?: {};
    }
}

interface ProLoadingPluginToken extends FullToken<'ProLoadingPlugin'> {
    // --
}

function genBaseStyle (token: ProLoadingPluginToken): CSSInterpolation {
    const { componentCls, iconCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-mask`]: {
                position: 'fixed',
                inset: 0,
                zIndex: token.zIndexPopupBase + 30,
                backgroundColor: token.colorBgMask,
                userSelect: 'none',
                [`${componentCls}-spin`]: {
                    position: 'absolute',
                    insetBlockStart: '50%',
                    insetInlineStart: '50%',
                    transform: 'translate3d(-50%, -50%, 0)',
                    [iconCls]: {
                        fontSize: token.sizeXXL,
                        opacity: 0.8
                    }
                }
            },
            [`${componentCls}-mask-fade`]: {
                [`&-enter-active, &-appear-active, &-leave-active`]: {
                    transition: `all ${token.motionDurationMid}`
                },
                [`&-enter-from, &-appear-from`]: {
                    opacity: 0
                },
                [`&-enter-to, &-appear-to`]: {
                    opacity: 1
                },
                [`&-leave-from`]: {
                    opacity: 1
                },
                [`&-leave-to`]: {
                    opacity: 0
                }
            }
        }
    }
}

function styleFn (token: FullToken<'ProLoadingPlugin'>): CSSInterpolation {
    const proLoadingPluginToken: ProLoadingPluginToken = mergeToken<ProLoadingPluginToken>(token, {})
    return genBaseStyle(proLoadingPluginToken)
}

export default genComponentStyleHook('ProLoadingPlugin', styleFn)
