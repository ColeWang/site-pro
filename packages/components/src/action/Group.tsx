import type { App, SlotsType, VNode } from 'vue'
import { defineComponent, unref } from 'vue'
import { Dropdown, Menu, Space, theme } from 'ant-design-vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { flattenChildren } from '@site-pro/utils'
import { take, takeRight } from 'lodash-es'
import Action from './Action'
import { actionGroupProps } from './typings'

const ActionGroup = defineComponent({
    inheritAttrs: false,
    name: 'ProActionGroup',
    props: actionGroupProps(),
    slots: Object as SlotsType<{
        default?: any;
    }>,
    setup (props, { slots, attrs }) {
        const { token } = theme.useToken()
        return () => {
            const { max, size: propsSize } = props
            const { sizeMS } = unref(token)

            const nodes: VNode[] = flattenChildren(slots.default ? slots.default() : [])

            if (nodes.length && nodes.length > max) {
                // 前部分
                const firstHalfNodes: VNode[] = take(nodes, max)
                // 后部分
                const secondHalfNodes: VNode[] = takeRight(nodes, nodes.length - max)
                /* v8 ignore next 9 */
                const dropdownSlots: Recordable<BaseSlot> = {
                    overlay: () => (
                        <Menu data-type={'dropdown'} selectedKeys={[]}>
                            {secondHalfNodes.map((item, index) => {
                                return <Menu.Item key={index}>{item}</Menu.Item>
                            })}
                        </Menu>
                    )
                }
                return (
                    <Space size={propsSize || sizeMS / 2} {...attrs}>
                        {firstHalfNodes}
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

export default ActionGroup
