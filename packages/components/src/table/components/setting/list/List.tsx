import { defineComponent, unref } from 'vue'
import { theme as antTheme, Tree as AntTree } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import type { NodeProps } from '../node'
import { Node as TreeNode } from '../node'
import DraggableOutlined from './DraggableOutlined'
import type { TreeCheckInfo, TreeDataNode, TreeProps } from '../../../../ant-typings'
import type { TableColumn } from '../../../typings'
import type { TreeNodeDropInfo } from './typings'
import { listProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableSettingList',
    props: listProps(),
    emits: ['checkChange', 'dropChange', 'fixedChange'],
    setup (props, { emit }) {
        const { prefixCls } = useConfigInject('pro-table-setting-list', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = antTheme.useToken()

        /* v8 ignore next 5 */
        function onTreeNodeCheck (_: any, info: TreeCheckInfo): void {
            const { node, checked } = info
            const column: TableColumn | undefined = props.columns.find((item) => item.key === node.key)
            column && emit('checkChange', node.key, { ...column, checked: checked })
        }

        /* v8 ignore next 6 */
        function onTreeNodeDrop (info: TreeNodeDropInfo): void {
            const { node, dragNode, dropPosition } = info
            const dragKey: string = (dragNode.key as string)
            const dropKey: string = (node.key as string)
            const dropPos: string[] = node.pos!.split('-')
            const trueDropPosition: number = dropPosition - Number(dropPos[dropPos.length - 1])
            emit('dropChange', dragKey, dropKey, trueDropPosition, dropPosition)
        }

        /* v8 ignore next 4 */
        function onChangeFixed (key: string, fixed: boolean): void {
            const column: TableColumn | undefined = props.columns.find((item) => item.key === key)
            column && emit('fixedChange', key, { ...column, fixed: fixed })
        }

        return () => {
            if (props.columns.length === 0) return null
            // ----
            const { columns, showTitle, title, fixed, checkable, draggable } = props
            const { controlHeightSM } = unref(token)

            const checkedKeys: string[] = columns
                .filter((item) => item.checked !== false)
                .map((item) => item.key as string)

            const treeSlots: Recordable<BaseSlot> = {
                title: (slotProps: any) => {
                    const treeNodeProps: NodeProps = {
                        ...slotProps,
                        fixed: fixed,
                        columnKey: slotProps.key,
                        onChange: onChangeFixed
                    }
                    return (
                        <TreeNode {...treeNodeProps}/>
                    )
                }
            }

            const loopTreeData: TreeDataNode[] = columns.map((item) => {
                return {
                    key: item.key as string,
                    disableCheckbox: item.disable === true,
                    title: item.title,
                    selectable: false
                }
            })

            // FIX: icon 没对外暴露
            const needDraggable: any = draggable ? { icon: <DraggableOutlined/> } : false

            const needTreeProps: TreeProps = {
                height: controlHeightSM * 10,
                blockNode: true,
                checkStrictly: true,
                checkable: checkable,
                draggable: needDraggable,
                checkedKeys: checkedKeys,
                treeData: loopTreeData,
                onCheck: onTreeNodeCheck,
                onDrop: onTreeNodeDrop
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]}>
                    {showTitle && (
                        <div class={`${prefixCls.value}-title`}>{title}</div>
                    )}
                    <AntTree {...needTreeProps} v-slots={treeSlots}/>
                </div>
            )
        }
    }
})
