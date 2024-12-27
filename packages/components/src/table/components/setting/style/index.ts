import type { CSSInterpolation, ThemeFullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

declare module 'ant-design-vue/es/theme/interface' {
    export interface ComponentTokenMap {
        ProTableSetting?: {};
    }
}

interface ProTableSettingToken extends ThemeFullToken<'ProTableSetting'> {
    proTableSettingListMinWidth: number;
}

function genBaseStyle (token: ProTableSettingToken): CSSInterpolation {
    const { componentCls, proTableSettingListMinWidth } = token
    return {
        [componentCls]: {
            position: 'relative',
            [`${componentCls}-title`]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: token.lineHeight,
                fontWeight: token.fontWeightStrong
            },
            [`${componentCls}-tree-list-group`]: {
                minWidth: proTableSettingListMinWidth,
                display: 'flex',
                flexDirection: 'column'
            }
        }
    }
}

function styleFn (token: ThemeFullToken<'ProTableSetting'>): CSSInterpolation {
    const proTableSettingListMinWidth: number = token.controlHeightSM * 8
    const proTableSettingToken: ProTableSettingToken = mergeToken<ProTableSettingToken>(token, {
        proTableSettingListMinWidth
    })
    return genBaseStyle(proTableSettingToken)
}

export default genComponentStyleHook('ProTableSetting', styleFn)
