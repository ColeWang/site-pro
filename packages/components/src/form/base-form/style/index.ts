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

export default genComponentStyleHook('ProBaseForm', (token) => {
    const proBaseFormToken: ProBaseFormToken = mergeToken(token, {})
    return genBaseStyle(proBaseFormToken)
})
