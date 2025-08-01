import type { ComputedRef, Ref, VNode } from 'vue'
import { computed, ref, unref } from 'vue'
import { useReactivePick } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { convertToCamelCaseProps, isValidElement } from '@site-pro/utils'
import { map } from 'lodash-es'
import useBreakPoint from './useBreakPoint'
import { useConfigReceiverExtended } from '../../config-provider'
import type { ResizeObserverRectSize } from '../../resize-observer'
import type { QueryFilterLayout, QueryFilterProps } from '../typings'

interface ColDealNode {
    child: VNode;
    hidden: boolean;
    key: string | number | symbol;
}

interface GenColNodesIteratee {
    (node: ColDealNode): VNode;
}

interface GenColNodesResult {
    nodes: VNode[];
    offset: number;
    haveRow: boolean;
}

interface UseQueryFilterResult {
    layout: Ref<QueryFilterLayout>;
    span: Ref<number>;
    showCollapse: Ref<boolean>;
    collapsed: Ref<boolean>;
    setCollapse: (value: boolean) => void;
    genColNodes: (children: VNode[], iteratee: GenColNodesIteratee) => GenColNodesResult;
}

function getOffset (length: number, span: number): number {
    const cols: number = 24 / span
    return (cols - 1 - (length % cols)) * span
}

function useQueryFilter (
    size: Ref<ResizeObserverRectSize>,
    props: QueryFilterProps
): UseQueryFilterResult {
    const mergeProps: Partial<QueryFilterProps> = useReactivePick(props, ['layout'])
    const { extended } = useConfigReceiverExtended('QueryFilter', mergeProps)
    const { layout, span } = useBreakPoint(size, extended)

    const showCollapse: Ref<boolean> = ref(props.collapse!)
    const collapsed: Ref<boolean> = ref(props.defaultCollapsed!)

    const showNumber: ComputedRef<number> = computed(() => {
        const cols: number = 24 / unref(span) * props.defaultRowsNumber!
        return Math.max(1, cols - 1)
    })

    function setCollapse (value: boolean): void {
        collapsed.value = value
    }

    function checkShowCollapse (children: VNode[]): void {
        const showNodes: VNode[] = children.filter((child) => {
            const childProps: Recordable = convertToCamelCaseProps(child.props || {})
            return childProps.hidden === false || childProps.hidden === undefined
        })
        // 最大显示节点数 > 保留节点数
        showCollapse.value = showNodes.length > unref(showNumber)
    }

    function createDealNodes (children: VNode[]): ColDealNode[] {
        const maxIndex: number = unref(showNumber) - 1
        // 计数器
        let hiddenCount: number = 0
        const isChildHidden = (propsHidden: boolean, index: number) => {
            propsHidden && (hiddenCount += 1)
            const cHidden: boolean = unref(collapsed) && (index - hiddenCount) > maxIndex
            return props.collapse ? (propsHidden || cHidden) : propsHidden
        }

        return children.map((child, index) => {
            const childProps: Recordable = convertToCamelCaseProps(child.props || {})
            const propsHidden: boolean = childProps.hidden || false
            const hidden: boolean = isChildHidden(propsHidden, index)
            const key: string | number | symbol = (isValidElement(child) && child.key) || index
            return { key: key, child: child, hidden: hidden }
        })
    }

    function genColNodes (children: VNode[], iteratee: GenColNodesIteratee): GenColNodesResult {
        // 校验 collapse
        props.collapse && checkShowCollapse(children)

        const dealNodes: ColDealNode[] = createDealNodes(children)
        const showNodes: ColDealNode[] = dealNodes.filter((c) => !c.hidden)
        const offset: number = getOffset(showNodes.length, unref(span))
        const haveRow: boolean = unref(span) + offset === 24

        return { nodes: map(dealNodes, iteratee), offset, haveRow }
    }

    return { layout, span, showCollapse, collapsed, setCollapse, genColNodes }
}

export default useQueryFilter
