import type { App, Plugin, SlotsType, VNode } from 'vue'
import { defineComponent, unref } from 'vue'
import { Dropdown as AntDropdown, Menu as AntMenu, Space as AntSpace, theme as antTheme } from 'ant-design-vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { flatVNodeChildren } from '@site-pro/utils'
import { drop, take } from 'lodash-es'
import Action from './Action'
import type { ActionGroupSlots } from './typings'
import { actionGroupProps } from './typings'

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

            if (nodes.length && nodes.length > max) {
                const takeNodes: VNode[] = take(nodes, max)
                const dropNodes: VNode[] = drop(nodes, max)

                const children: VNode[] = dropNodes.map((item, index) => {
                    return <AntMenu.Item key={index}>{item}</AntMenu.Item>
                })
                /* v8 ignore next 9 */
                const dropdownSlots: Recordable<BaseSlot> = {
                    overlay: () => (
                        <AntMenu data-type={'dropdown'} selectedKeys={[]}>
                            {children}
                        </AntMenu>
                    )
                }
                return (
                    <AntSpace size={propsSize || sizeMS / 2} {...attrs}>
                        {takeNodes}
                        <AntDropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                            <Action>...</Action>
                        </AntDropdown>
                    </AntSpace>
                )
            }
            return (
                <AntSpace size={propsSize || sizeMS / 2} {...attrs}>
                    {nodes}
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
