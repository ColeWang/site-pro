import { defineComponent, unref } from 'vue'
import { Button as AntButton, Checkbox as AntCheckbox, theme as antTheme } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { toPx } from '@site-pro/utils'
import { reduce, set } from 'lodash-es'
import { useLocaleReceiver } from '../../../locale-provider'
import { useSharedContext } from '../../hooks/useSharedContext'
import type { ListProps } from './list'
import { List as TreeList } from './list'
import type { TableColumn } from '../../typings'
import { settingProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSetting',
    props: settingProps(),
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-table-setting', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = antTheme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { columns, columnsMap, onColumnsMapChange } = useSharedContext()

        /* v8 ignore next 8 */
        function onCheckClick (evt: any): void {
            const currentColumnsMap: Recordable<TableColumn> = unref(columnsMap) || {}
            const { checked: targetChecked } = evt.target || {}
            const values: Recordable<TableColumn> = reduce(currentColumnsMap, (result, column, key) => {
                const { hideInSetting, disable } = column || {}
                const checked = hideInSetting || disable ? column.checked : targetChecked
                return set(result, key, { ...column, checked: checked })
            }, {})
            onColumnsMapChange && onColumnsMapChange(values)
        }

        /* v8 ignore next 3 */
        function onResetClick () {
            // 重置 Columns Map
            onColumnsMapChange && onColumnsMapChange(undefined)
        }

        /* v8 ignore next 4 */
        function onFixedChange (key: string, column: TableColumn): void {
            const currentColumnsMap: Recordable<TableColumn> = unref(columnsMap) || {}
            const values: Recordable<TableColumn> = { ...currentColumnsMap, [key]: column }
            onColumnsMapChange && onColumnsMapChange(values)
        }

        /* v8 ignore next 4 */
        function onCheckChange (key: string, column: TableColumn): void {
            const currentColumnsMap: Recordable<TableColumn> = unref(columnsMap) || {}
            const values: Recordable<TableColumn> = { ...currentColumnsMap, [key]: column }
            onColumnsMapChange && onColumnsMapChange(values)
        }

        /* v8 ignore next 17 */
        function onDropChange (
            dragKey: string,
            dropKey: string,
            trueDropPosition: number,
            dropPosition: number
        ): void {
            const currentColumnsMap: Recordable<TableColumn> = unref(columnsMap) || {}
            const currentColumns: TableColumn[] = unref(columns) || []
            // ---
            const keys: string[] = currentColumns.map((column) => column.key as string)
            const dragIndex: number = keys.findIndex((key) => key === dragKey)
            const dropIndex: number = keys.findIndex((key) => key === dropKey)
            const target: string = keys[dragIndex]
            keys.splice(dragIndex, 1)
            if (trueDropPosition === -1 || dropPosition > dragIndex) {
                keys.splice(dropIndex, 0, target)
            } else {
                keys.splice(dropIndex + 1, 0, target)
            }
            const values: Recordable<TableColumn> = reduce(keys, (result, key, order) => {
                const column: TableColumn = currentColumnsMap[key] || {}
                return set(result, key, { ...column, order })
            }, {})
            onColumnsMapChange && onColumnsMapChange(values)
        }

        return () => {
            const { checkable, draggable } = props
            const { sizeXXS } = unref(token)

            // 不在 setting 中展示的
            const currentColumns: TableColumn[] = unref(columns) || []
            const needColumns: TableColumn[] = currentColumns.filter((item) => !item.hideInSetting)

            // 全选
            const unCheckedColumns: TableColumn[] = needColumns.filter((item) => item.checked === false)
            const indeterminate: boolean = unCheckedColumns.length > 0 && unCheckedColumns.length !== needColumns.length
            const checked: boolean = unCheckedColumns.length === 0 && unCheckedColumns.length !== needColumns.length

            // 展示列表
            const leftList: TableColumn[] = needColumns.filter((item) => item.fixed === 'left')
            const centerList: TableColumn[] = needColumns.filter((item) => item.fixed === undefined)
            const rightList: TableColumn[] = needColumns.filter((item) => item.fixed === 'right')

            const showTitle: boolean = leftList.length > 0 || rightList.length > 0

            const treeListProps: ListProps = {
                checkable: checkable,
                draggable: draggable,
                onCheckChange: onCheckChange,
                onFixedChange: onFixedChange,
                onDropChange: onDropChange
            }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-title`}>
                        <AntCheckbox
                            indeterminate={indeterminate}
                            checked={checked}
                            onChange={onCheckClick}
                        >
                            {t('columnDisplay')}
                        </AntCheckbox>
                        <AntButton
                            style={{ padding: toPx(sizeXXS) }}
                            type={'link'}
                            onClick={onResetClick}
                        >
                            {t('reset')}
                        </AntButton>
                    </div>
                    <div class={`${prefixCls.value}-tree-list-group`}>
                        <TreeList
                            fixed={'left'}
                            title={t('leftPin')}
                            columns={leftList}
                            {...treeListProps}
                        />
                        <TreeList
                            title={t('noPin')}
                            showTitle={showTitle}
                            columns={centerList}
                            {...treeListProps}
                        />
                        <TreeList
                            fixed={'right'}
                            title={t('rightPin')}
                            columns={rightList}
                            {...treeListProps}
                        />
                    </div>
                </div>
            )
        }
    }
})
