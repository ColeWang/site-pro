import type { CSSInterpolation, FullToken } from '../../../../theme'
import { genComponentStyleHook, mergeToken } from '../../../../theme'

interface ProTableSettingListToken extends FullToken<'ProTableSettingList'> {
    proTableSettingListTitleMargin: number;
    proTableSettingListHolderPadding: number;
    proTableSettingListCheckboxMargin: number;
}

function genBaseStyle (token: ProTableSettingListToken): CSSInterpolation {
    const {
        componentCls,
        antCls,
        proTableSettingListTitleMargin,
        proTableSettingListHolderPadding,
        proTableSettingListCheckboxMargin
    } = token
    return {
        [componentCls]: {
            paddingBlockStart: token.paddingXS,
            [`${componentCls}-title`]: {
                fontSize: token.fontSizeSM,
                color: token.colorTextSecondary,
                lineHeight: token.lineHeightSM,
                marginBlock: proTableSettingListTitleMargin,
                paddingInlineStart: token.controlHeightSM
            },
            [`${antCls}-tree`]: {
                background: token.colorFillQuaternary,
                [`${antCls}-tree-list-holder`]: {
                    paddingBlockStart: proTableSettingListHolderPadding
                },
                [`${antCls}-tree-node-content-wrapper`]: {
                    backgroundColor: 'transparent !important',
                    [`&:hover`]: {
                        // Tree Node
                        [`${antCls}-pro-table-setting-node-option-icon`]: {
                            display: 'block'
                        }
                    }
                },
                [`${antCls}-tree-treenode`]: {
                    alignItems: 'center',
                    [`${antCls}-tree-checkbox`]: {
                        margin: `0 ${proTableSettingListCheckboxMargin}px 0 0`,
                        insetBlockStart: 0
                    }
                },
                [`${antCls}-tree-draggable-icon`]: {
                    cursor: 'pointer',
                    opacity: '1 !important'
                }
            }
        }
    }
}

function styleFn (token: FullToken<'ProTableSettingList'>): CSSInterpolation {
    const proTableSettingListTitleMargin: number = token.controlHeightSM - token.fontSizeSM * token.lineHeightSM
    const proTableSettingListHolderPadding: number = token.sizeXS / 2
    const proTableSettingListCheckboxMargin: number = (token.controlHeightSM - token.controlHeight / 2) / 2

    const proTableSettingListToken: ProTableSettingListToken = mergeToken<ProTableSettingListToken>(token, {
        proTableSettingListTitleMargin,
        proTableSettingListHolderPadding,
        proTableSettingListCheckboxMargin
    })
    return genBaseStyle(proTableSettingListToken)
}

export default genComponentStyleHook('ProTableSettingList', styleFn)
