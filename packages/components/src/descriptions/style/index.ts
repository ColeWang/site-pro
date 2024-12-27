import type { CSSInterpolation, ThemeFullToken } from '../../theme'
import { genComponentStyleHook, mergeToken } from '../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProDescriptions?: {};
    }
}

interface ProDescriptionsToken extends ThemeFullToken<'ProDescriptions'> {
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
            },
            [`${componentCls}-item-tooltip`]: {
                color: token.colorTextDescription,
                cursor: 'help',
                writingMode: 'horizontal-tb',
                marginInlineStart: token.marginXXS,
            }
        }
    }
}

export default genComponentStyleHook('ProDescriptions', (token) => {
    const { antCls } = token

    const proFieldTextareaReadCls: string = `${antCls}-pro-field-textarea__read`

    const proDescriptionsToken: ProDescriptionsToken = mergeToken<ProDescriptionsToken>(token, {
        proFieldTextareaReadCls
    })
    return genBaseStyle(proDescriptionsToken)
})
