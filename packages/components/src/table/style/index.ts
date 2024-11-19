import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

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
    const proTableToken = mergeToken<ProTableToken>(token, {})
    return genBaseStyle(proTableToken)
}

export default genComponentStyleHook('ProTable', styleFn)
