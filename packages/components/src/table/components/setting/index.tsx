import { type ComponentPublicInstance, defineComponent, type ExtractPropTypes, unref } from 'vue'
import { Button, Checkbox, theme } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { reduce, set } from 'lodash-es'
import type { ListProps } from './components/List'
import TreeList from './components/List'
import type { TableColumn } from '../../typings'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '../../../locale-provider'
import useStyle from './style'

export const settingProps = () => ({
    checkable: {
        type: Boolean,
        default: true
    },
    draggable: {
        type: Boolean,
        default: true
    }
})

export type SettingProps = Partial<ExtractPropTypes<ReturnType<typeof settingProps>>>;
export type SettingInstance = ComponentPublicInstance<SettingProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSetting',
    props: settingProps(),
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-table-setting', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const {
            columns = [] as TableColumn[],
            columnsMap = {} as Recordable<TableColumn>,
            setColumnsMap,
            resetColumnsMap
        } = useSharedContext()

        /* v8 ignore next 8 */
        function onCheckClick (evt: any): void {
            const { checked: targetChecked } = evt.target || {}
            const values: Recordable<TableColumn> = reduce(unref(columnsMap), (result, column, key) => {
                const { hideInSetting, disable } = column || {}
                const checked = hideInSetting || disable ? column.checked : targetChecked
                return set(result, key, { ...column, checked: checked })
            }, {})
            setColumnsMap && setColumnsMap(values)
        }

        /* v8 ignore next 3 */
        function onClearClick () {
            resetColumnsMap && resetColumnsMap()
        }

        /* v8 ignore next 4 */
        function onFixedChange (key: string, column: TableColumn): void {
            const values: Recordable<TableColumn> = { ...unref(columnsMap), [key]: column }
            setColumnsMap && setColumnsMap(values)
        }

        /* v8 ignore next 4 */
        function onCheckChange (key: string, column: TableColumn): void {
            const values: Recordable<TableColumn> = { ...unref(columnsMap), [key]: column }
            setColumnsMap && setColumnsMap(values)
        }

        /* v8 ignore next 17 */
        function onDropChange (
            dragKey: string,
            dropKey: string,
            trueDropPosition: number,
            dropPosition: number
        ): void {
            const keys: string[] = unref(columns).map((column) => column.key as string)
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
                const column: TableColumn = unref(columnsMap)[key] || {}
                return set(result, key, { ...column, order })
            }, {})
            setColumnsMap && setColumnsMap(values)
        }

        return () => {
            const { checkable, draggable } = props
            const { sizeXXS } = unref(token)

            // 不在 setting 中展示的
            const needColumns: TableColumn[] = unref(columns).filter((item) => !item.hideInSetting)

            const unCheckedColumns: TableColumn[] = needColumns.filter((item) => item.checked === false)
            const indeterminate: boolean = unCheckedColumns.length > 0 && unCheckedColumns.length !== needColumns.length
            const checked: boolean = unCheckedColumns.length === 0 && unCheckedColumns.length !== needColumns.length

            const leftList: TableColumn[] = needColumns.filter((item) => item.fixed === 'left')
            const list: TableColumn[] = needColumns.filter((item) => item.fixed === undefined)
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
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={checked}
                            onChange={onCheckClick}
                        >
                            {t('columnDisplay')}
                        </Checkbox>
                        <Button
                            style={{ padding: `${sizeXXS}px` }}
                            type={'link'}
                            onClick={onClearClick}
                        >
                            {t('reset')}
                        </Button>
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
                            columns={list}
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
