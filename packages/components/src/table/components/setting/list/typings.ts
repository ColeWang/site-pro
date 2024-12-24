import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { TreeEventDataNode, TreeNodeDragEventParams } from '../../../../ant-typings'
import type { TableColumn } from '../../../typings'

export interface TreeNodeDropInfo extends TreeNodeDragEventParams {
    dragNode: TreeEventDataNode;
    dragNodesKeys: (string | number)[];
    dropPosition: number;
    dropToGap: boolean;
}

export const listProps = () => ({
    showTitle: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    title: {
        type: String as PropType<string>,
        default: undefined
    },
    fixed: {
        type: String as PropType<string>,
        default: undefined
    },
    columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => ([])
    },
    checkable: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    draggable: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    onCheckChange: {
        type: Function as PropType<(key: string, column: TableColumn) => void>,
        default: undefined
    },
    onDropChange: {
        type: Function as PropType<(dragKey: string, dropKey: string, trueDropPosition: number, dropPosition: number) => void>,
        default: undefined
    },
    onFixedChange: {
        type: Function as PropType<(key: string, column: TableColumn) => void>,
        default: undefined
    }
})

export type ListProps = Partial<ExtractPropTypes<ReturnType<typeof listProps>>>;
export type ListInstance = ComponentPublicInstance<ListProps>;
