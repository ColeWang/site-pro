import type { CSSInterpolation, FullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

interface ProTableSettingToken extends FullToken<'ProTableSetting'> {
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

function styleFn (token: FullToken<'ProTableSetting'>): CSSInterpolation {
    const proTableSettingListMinWidth: number = token.sizeMS
    const proTableSettingToken: ProTableSettingToken = mergeToken<ProTableSettingToken>(token, {
        proTableSettingListMinWidth
    })
    return genBaseStyle(proTableSettingToken)
}

export default genComponentStyleHook('ProTableSetting', styleFn)
