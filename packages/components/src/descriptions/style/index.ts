import type { CSSInterpolation, FullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

interface ProDescriptionsToken extends FullToken<'ProDescriptions'> {
    proFieldTextareaReadCls: string;
}

function genBaseStyle (token: ProDescriptionsToken): CSSInterpolation {
    const { componentCls, proFieldTextareaReadCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {
                [`${componentCls}-header`]: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBlockEnd: token.sizeMS,
                    [`${componentCls}-title`]: {
                        flex: 'auto',
                        fontSize: token.fontSizeLG,
                        color: token.colorText,
                        lineHeight: token.lineHeightLG,
                        fontWeight: token.fontWeightStrong,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    },
                    [`${componentCls}-extra`]: {
                        fontSize: token.fontSize,
                        color: token.colorText,
                        marginInlineStart: 'auto'
                    }
                },
                [proFieldTextareaReadCls]: {
                    padding: '0 !important'
                }
            }
        }
    }
}

export default genComponentStyleHook('ProDescriptions', (token) => {
    const { antCls } = token

    const proFieldTextareaReadCls: string = `${antCls}-pro-field-textarea__read`

    const descriptionsToken: ProDescriptionsToken = mergeToken<ProDescriptionsToken>(token, {
        proFieldTextareaReadCls
    })
    return genBaseStyle(descriptionsToken)
})
