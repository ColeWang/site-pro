import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProBaseForm?: {};
    }
}

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
            [`${antCls}-form`]: {
                // [`&-inline`]: {
                //     [`${antCls}-form-item`]: {
                //         marginInlineEnd: token.sizeMS
                //     }
                // }
            }
        }
    }
}

function styleFn (token: FullToken<'ProBaseForm'>): CSSInterpolation {
    const proBaseFormToken: ProBaseFormToken = mergeToken<ProBaseFormToken>(token, {})
    return genBaseStyle(proBaseFormToken)
}

export default genComponentStyleHook('ProBaseForm', styleFn)
