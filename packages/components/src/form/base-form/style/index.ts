import type { CSSInterpolation, FullToken } from '../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../theme'

interface ProBaseFormToken extends FullToken<'ProBaseForm'> {
    // --
}

function genBaseStyle (token: ProBaseFormToken): CSSInterpolation {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${antCls}-form`]: {}
        }
    }
}

const useStyle = genComponentStyleHook('ProBaseForm', (token) => {
    const proBaseFormToken = mergeToken<ProBaseFormToken>(token, {})
    return genBaseStyle(proBaseFormToken)
})

export default useStyle
