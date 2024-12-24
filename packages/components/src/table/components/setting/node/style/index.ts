import type { CSSInterpolation, FullToken } from '../../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProTableSettingNode?: {};
    }
}

interface ProTableSettingNodeToken extends FullToken<'ProTableSettingNode'> {
    proTableSettingNodeTitleMaxWidth: number;
    proTableSettingNodeOptionWidth: number;
    proTableSettingNodeOptionPaddingInline: number;
}

function genBaseStyle (token: ProTableSettingNodeToken): CSSInterpolation {
    const {
        componentCls,
        iconCls,
        proTableSettingNodeTitleMaxWidth,
        proTableSettingNodeOptionWidth,
        proTableSettingNodeOptionPaddingInline
    } = token
    return {
        [componentCls]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [`${componentCls}-title`]: {
                maxWidth: proTableSettingNodeTitleMaxWidth,
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: `${token.controlHeightSM}px`,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            },
            [`${componentCls}-option`]: {
                width: proTableSettingNodeOptionWidth,
                [`${componentCls}-option-icon`]: {
                    paddingInline: proTableSettingNodeOptionPaddingInline,
                    display: 'none',
                    [`${iconCls}`]: {
                        width: token.fontSize,
                        height: token.fontSize,
                        lineHeight: `${token.fontSize}px`,
                        fontSize: token.fontSize,
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: token.colorLink
                    }
                }
            }
        }
    }
}

function styleFn (token: FullToken<'ProTableSettingNode'>): CSSInterpolation {
    const proTableSettingNodeTitleMaxWidth: number = token.controlHeightSM * 7
    const proTableSettingNodeOptionWidth: number = token.fontSize * 2 + token.sizeMS + token.sizeXXS
    const proTableSettingNodeOptionPaddingInline: number = token.sizeMS / 2

    const proTableSettingNodeToken: ProTableSettingNodeToken = mergeToken<ProTableSettingNodeToken>(token, {
        proTableSettingNodeTitleMaxWidth,
        proTableSettingNodeOptionWidth,
        proTableSettingNodeOptionPaddingInline
    })
    return genBaseStyle(proTableSettingNodeToken)
}

export default genComponentStyleHook('ProTableSettingNode', styleFn)
