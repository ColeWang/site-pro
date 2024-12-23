import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProTable?: {};
    }
}

interface ProTableToken extends FullToken<'ProTable'> {
    // ---
}

function genBaseStyle (token: ProTableToken): CSSInterpolation {
    const { componentCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {}
        }
    }
}

function styleFn (token: FullToken<'ProTable'>): CSSInterpolation {
    const proTableToken: ProTableToken = mergeToken<ProTableToken>(token, {})
    return genBaseStyle(proTableToken)
}

export default genComponentStyleHook('ProTable', styleFn)
