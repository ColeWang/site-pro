import type { App, Plugin, SlotsType, VNode } from 'vue'
import { defineComponent, unref } from 'vue'
import { Dropdown, Menu, Space, theme } from 'ant-design-vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { flattenChildren } from '@site-pro/utils'
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
        const { token } = theme.useToken()
        return () => {
            const { max, size: propsSize } = props
            const { sizeMS } = unref(token)

            const nodes: VNode[] = flattenChildren(slots.default ? slots.default() : [])

            if (nodes.length && nodes.length > max) {
                const takeNodes: VNode[] = take(nodes, max)
                const dropNodes: VNode[] = drop(nodes, max)

                const menuNodes: VNode[] = dropNodes.map((item, index) => {
                    return <Menu.Item key={index}>{item}</Menu.Item>
                })
                /* v8 ignore next 9 */
                const dropdownSlots: Recordable<BaseSlot> = {
                    overlay: () => (
                        <Menu data-type={'dropdown'} selectedKeys={[]}>
                            {menuNodes}
                        </Menu>
                    )
                }
                return (
                    <Space size={propsSize || sizeMS / 2} {...attrs}>
                        {takeNodes}
                        <Dropdown placement={'bottomRight'} v-slots={dropdownSlots}>
                            <Action>...</Action>
                        </Dropdown>
                    </Space>
                )
            }
            return (
                <Space size={propsSize || sizeMS / 2} {...attrs}>
                    {nodes}
                </Space>
            )
        }
    }
})

ActionGroup.install = function (app: App): App {
    app.component(ActionGroup.name as string, ActionGroup)
    return app
}

export default ActionGroup as typeof ActionGroup & Plugin
