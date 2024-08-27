import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

interface ProTransitionToken extends FullToken<'ProTransition'> {
    // --
}

function genBaseStyle (token: ProTransitionToken): CSSInterpolation {
    const { componentCls } = token
    return {
        [`${componentCls}`]: {
            [`${componentCls}-collapse`]: {
                transition: 'height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
                overflow: 'hidden'
            }
        }
    }
}

const useStyle = genComponentStyleHook('ProTransition', (token) => {
    const proTransitionToken = mergeToken<ProTransitionToken>(token, {})
    return genBaseStyle(proTransitionToken)
})

export default useStyle
