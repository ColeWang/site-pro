import type { ComputedRef, CSSProperties, Ref, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, ref, unref, watch } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { Menu, theme } from 'ant-design-vue'
import { getSlotVNode, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { isArray, isFunction } from 'lodash-es'
import type { SidebarItem, SidebarSlots } from './typings'
import { sidebarProps } from './typings'
import useStyle from './style'

function createMenuItem (item: SidebarItem): VNodeChild {
    if (item.items && isArray(item.items)) {
        const children: VNodeChild = item.items.map(createMenuItem)
        return (
            <Menu.ItemGroup title={item.text}>
                {children}
            </Menu.ItemGroup>
        )
    }
    return (
        <Menu.Item key={item.link}>
            <span>{item.text}</span>
        </Menu.Item>
    )
}

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutSidebar',
    props: sidebarProps(),
    slots: Object as SlotsType<SidebarSlots>,
    emits: ['change'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-sidebar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

        const selectedKeys: Ref<string[]> = ref([])

        const menuStyle: ComputedRef<CSSProperties> = computed(() => {
            const { controlHeightLG } = unref(token)
            const width: number = controlHeightLG * 6
            if (props.styleFn && isFunction(props.styleFn)) {
                return props.styleFn(width) || { width: toPx(width) }
            }
            return { width: toPx(width) }
        })

        watch(() => props.route, (currentRoute) => {
            const { name } = currentRoute
            selectedKeys.value = [name]
        }, { deep: true, immediate: true })

        function onSelectMenu (params) {
            if (props.route.name !== params.key) {
                emit('change', params.key)
            }
        }

        return () => {
            const { menus } = props

            const menuProps: MenuProps = {
                mode: 'inline',
                selectedKeys: unref(selectedKeys),
                onSelect: onSelectMenu
            }

            const children: VNodeChild = menus.map((item) => {
                return createMenuItem(item)
            })

            const logoDom: VNodeChild = getSlotVNode(slots, props, 'logo')

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value, `${prefixCls.value}-light`]} {...attrs}>
                    <div class={`${prefixCls.value}-space`}>
                        <div class={`${prefixCls.value}-content`}>
                            <div class={`${prefixCls.value}-logo`}>
                                {logoDom}
                            </div>
                            <Menu {...menuProps} style={unref(menuStyle)}>
                                {children}
                            </Menu>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
