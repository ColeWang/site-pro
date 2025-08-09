import type { CSSInterpolation, ThemeFullToken } from '@site-pro/components'
import { genComponentStyleHook, mergeToken } from '@site-pro/components'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProBaseLayout?: {};
    }
}

interface ProBaseLayoutToken extends ThemeFullToken<'ProBaseLayout'> {
    proBaseLayoutBgColor: string;
}

function genBaseStyle (token: ProBaseLayoutToken): CSSInterpolation {
    const { componentCls, proBaseLayoutBgColor } = token
    return {
        [componentCls]: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            background: proBaseLayoutBgColor,
            overflow: 'hidden',
            [`${componentCls}-prime`]: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                [`${componentCls}-content`]: {
                    flex: 1,
                    overflow: 'hidden'
                }
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProBaseLayout'>): CSSInterpolation {
    const proBaseLayoutBgColor: string = token.colorBgLayout

    const proBaseLayoutToken: ProBaseLayoutToken = mergeToken<ProBaseLayoutToken>(token, {
        proBaseLayoutBgColor
    })
    return genBaseStyle(proBaseLayoutToken)
}

export default genComponentStyleHook('ProBaseLayout', styleFn)
