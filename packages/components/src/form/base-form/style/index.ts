import type { FullToken, GenerateStyle } from '../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../theme'

interface ProBaseFormToken extends FullToken<'ProBaseForm'> {
    // --
}

const genBaseStyle: GenerateStyle<ProBaseFormToken> = (token) => {
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
    return [genBaseStyle(proBaseFormToken)]
})
