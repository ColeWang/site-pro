import type { CSSInterpolation, ThemeFullToken } from '@site-pro/components'
import { genComponentStyleHook, mergeToken } from '@site-pro/components'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProLayoutContainer?: {};
    }
}

interface ProLayoutContainerToken extends ThemeFullToken<'ProLayoutContainer'> {
    proLayoutContainerPaddingInline: number;
}

function genBaseStyle (token: ProLayoutContainerToken): CSSInterpolation {
    const { componentCls, proLayoutContainerPaddingInline } = token
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            [`${componentCls}-space`]: {
                width: '100%',
                height: '100%',
                paddingInline: proLayoutContainerPaddingInline,
                overflowY: 'auto',
                [`${componentCls}-view`]: {
                    position: 'relative',
                    [`${componentCls}-view-content`]: {
                        position: 'relative'
                    },
                    [`${componentCls}-view-fill`]: {
                        height: proLayoutContainerPaddingInline
                    }
                }
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProLayoutContainer'>): CSSInterpolation {
    const proLayoutContainerPaddingInline: number = token.sizeMS

    const proLayoutContainerToken: ProLayoutContainerToken = mergeToken<ProLayoutContainerToken>(token, {
        proLayoutContainerPaddingInline
    })
    return genBaseStyle(proLayoutContainerToken)
}

export default genComponentStyleHook('ProLayoutContainer', styleFn)
