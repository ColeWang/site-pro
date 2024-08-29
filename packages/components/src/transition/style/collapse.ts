import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

interface ProCollapseTransitionToken extends FullToken<'ProCollapseTransition'> {
    // --
}

function genBaseStyle (token: ProCollapseTransitionToken): CSSInterpolation {
    const { componentCls } = token
    return {
        [`${componentCls}`]: {
            [`${componentCls}-wrapper`]: {
                transition: 'height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
                overflow: 'hidden'
            }
        }
    }
}

const useStyle = genComponentStyleHook('ProCollapseTransition', (token) => {
    const proCollapseTransitionToken = mergeToken<ProCollapseTransitionToken>(token, {})
    return genBaseStyle(proCollapseTransitionToken)
})

export default useStyle
