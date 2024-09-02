import type { Ref, ComputedRef, VNode } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import { flattenChildren, isValidElement } from '@site-pro/utils'
import { map } from 'lodash-es'
import type { ResizeObserverRectSize } from '../../resize-observer'
import type { QueryFilterProps } from '../typings'
import useSpanConfig from './useSpanConfig'

function getOffset (length: number, span: number) {
    const cols = 24 / span
    return (cols - 1 - (length % cols)) * span
}

function useQueryFilter (size: Ref<ResizeObserverRectSize>, props: QueryFilterProps) {
    const { showCollapse } = props

    const { layout, span } = useSpanConfig(size, props)

    const collapsed: Ref<boolean> = ref(props.collapsed!)
    const showNumber: ComputedRef<number> = computed(() => {
        const cols = 24 / unref(span) * props.defaultRowsNumber!
        return Math.max(1, cols - 1)
    })

    const stopWatchCollapsed = watch(() => props.collapsed, (value) => {
        collapsed.value = value!
    }, { immediate: true })

    function setCollapse (value: boolean): void {
        collapsed.value = value
    }

    function createNodes (children: VNode[]) {
        const maxIndex = unref(showNumber) - 1
        // 计数器
        let hiddenCount = 0
        const isChildHidden = (propsHidden: boolean, index: number) => {
            propsHidden && (hiddenCount += 1)
            const cHidden = unref(collapsed) && (index - hiddenCount) > maxIndex
            return showCollapse ? (propsHidden || cHidden) : propsHidden
        }

        return children.map((child, index) => {
            const propsHidden = child.props && child.props.hidden || false
            const hidden: boolean = isChildHidden(propsHidden, index)
            const key = (isValidElement(child) && child.key) || index
            return { key: key, child: child, hidden: hidden }
        })
    }

    function genColNodes (children: VNode[], callback: (node: VNode) => VNode) {
        const validChildren = flattenChildren(children || [])
        const nodes = createNodes(validChildren)
        const showNodes = nodes.filter((c) => !c.hidden)
        const offset = getOffset(showNodes.length, unref(span))
        const haveRow = unref(span) + offset === 24
        return { nodes: map(nodes, callback), offset, haveRow }
    }

    function onStopHandle () {
        stopWatchCollapsed && stopWatchCollapsed()
    }

    tryOnScopeDispose(onStopHandle)

    return { layout, span, collapsed, setCollapse, genColNodes }
}

export default useQueryFilter
