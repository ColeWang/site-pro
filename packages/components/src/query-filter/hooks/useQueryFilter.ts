import type { ComputedRef, Ref, VNode, WatchStopHandle } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { convertToCamelCaseProps, isValidElement } from '@site-pro/utils'
import { map } from 'lodash-es'
import type { ResizeObserverRectSize } from '../../resize-observer'
import useBreakPoint from './useBreakPoint'
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
    const { layout, span } = useBreakPoint(size, props)

    const collapsed: Ref<boolean> = ref(props.collapsed!)
    const showNumber: ComputedRef<number> = computed(() => {
        const cols = 24 / unref(span) * props.defaultRowsNumber!
        return Math.max(1, cols - 1)
    })

    const stopWatchCollapsed: WatchStopHandle = watch(() => props.collapsed, (value) => {
        collapsed.value = value!
    }, { immediate: true })

    function setCollapse (value: boolean): void {
        collapsed.value = value
    }

    function createDealNodes (children: VNode[]): ColDealNode[] {
        const maxIndex: number = unref(showNumber) - 1
        // 计数器
        let hiddenCount: number = 0
        const isChildHidden = (propsHidden: boolean, index: number) => {
            propsHidden && (hiddenCount += 1)
            const cHidden: boolean = unref(collapsed) && (index - hiddenCount) > maxIndex
            return props.showCollapse ? (propsHidden || cHidden) : propsHidden
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
        const dealNodes: ColDealNode[] = createDealNodes(children)
        const showNodes: ColDealNode[] = dealNodes.filter((c) => !c.hidden)
        const offset: number = getOffset(showNodes.length, unref(span))
        const haveRow: boolean = unref(span) + offset === 24
        return { nodes: map(dealNodes, iteratee), offset, haveRow }
    }

    tryOnScopeDispose(() => {
        stopWatchCollapsed && stopWatchCollapsed()
    })

    return { layout, span, collapsed, setCollapse, genColNodes }
}

export default useQueryFilter
