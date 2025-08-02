import type { App, Plugin, SlotsType, VNode } from 'vue'
import { defineComponent, unref } from 'vue'
import { Dropdown as AntDropdown, Menu as AntMenu, Space as AntSpace, theme as antTheme } from 'ant-design-vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { flatVNodeChildren } from '@site-pro/utils'
import { drop, take } from 'lodash-es'
import Action from './Action'
import type { ActionGroupSlots } from './typings'
import { actionGroupProps } from './typings'

interface SplitNodesResult<T extends VNode> {
    visible: T[];
    hidden: T[];
}

function splitNodes<T extends VNode> (nodes: T[], max: number): SplitNodesResult<T> {
    return { visible: take(nodes, max), hidden: drop(nodes, max) }
}

function createDropdownMenu (nodes: VNode[]): JSX.Element {
    const children: JSX.Element[] = nodes.map((node, index) => (
        <AntMenu.Item key={node.key ?? index}>{node}</AntMenu.Item>
    ))

    return (
        <AntMenu data-type={'dropdown'} selectedselectedKeys={[]}>
            {children}
        </AntMenu>
    )
}

const ActionGroup = defineComponent({
    inheritAttrs: false,
    name: 'ProActionGroup',
    props: actionGroupProps(),
    slots: Object as SlotsType<ActionGroupSlots>,
    setup (props, { slots, attrs }) {
        const { token } = antTheme.useToken()

        return () => {
            const { max, size: propsSize } = props
            const { sizeMS } = unref(token)

            const nodes: VNode[] = flatVNodeChildren(slots.default ? slots.default() : [])

            if (!(nodes.length > 0) || nodes.length <= max) {
                return (
                    <AntSpace size={propsSize || sizeMS / 2} {...attrs}>
                        {nodes}
                    </AntSpace>
                )
            }

            const { visible: visibleNodes, hidden: hiddenNodes } = splitNodes(nodes, max)

            /* v8 ignore next 9 */
            const dropdownSlots: Recordable<BaseSlot> = {
                overlay: () => createDropdownMenu(hiddenNodes)
            }

            return (
                <AntSpace size={propsSize || sizeMS / 2} {...attrs}>
                    {visibleNodes}
                    <AntDropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                        <Action>...</Action>
                    </AntDropdown>
                </AntSpace>
            )
        }
    }
})

ActionGroup.install = function (app: App): App {
    app.component(ActionGroup.name as string, ActionGroup)
    return app
}

export default ActionGroup as typeof ActionGroup & Plugin
