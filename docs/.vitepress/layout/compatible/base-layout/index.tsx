import type { ComputedRef, CSSProperties, Ref, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { Recordable } from '@site-pro/utils'
import { getSlotVNode, toPx } from '@site-pro/utils'
import type { BaseSitePluginsExpose } from '@site-pro/plugins'
import { useSite } from '@site-pro/plugins'
import type { BaseLayoutSlots } from './typings'
import { baseLayoutProps } from './typings'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProBaseLayout',
    props: baseLayoutProps(),
    slots: Object as SlotsType<BaseLayoutSlots>,
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-base-layout', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const $site: BaseSitePluginsExpose = useSite()

        const hasDrawer: ComputedRef<boolean> = computed(() => $site.screen.lt.lg)
        const siderWidth: Ref<number> = ref(0)

        const open: Ref<boolean> = ref(false)

        function onUpdateOpen (value: boolean): void {
            open.value = value
        }

        function onClose (): void {
            unref(hasDrawer) && onUpdateOpen(false)
        }

        function styleFn (width: number): CSSProperties {
            // 缓存 width border 1px
            siderWidth.value = width
            return { width: toPx(width) }
        }

        return () => {
            const slotProps: Recordable = {
                open: unref(open),
                onUpdateOpen: onUpdateOpen,
                onClose: onClose,
                styleFn: styleFn,
            }

            const siderDom: VNodeChild = getSlotVNode(slots, props, 'sider', slotProps)
            const headerDom: VNodeChild = getSlotVNode(slots, props, 'header', slotProps)
            const contentDom: VNodeChild = getSlotVNode(slots, props, 'content', slotProps)

            const needSiderDom: VNodeChild = unref(hasDrawer) ? (
                <Drawer
                    bodyStyle={{ padding: 0 }}
                    placement={'left'}
                    closable={false}
                    width={unref(siderWidth) + 1}
                    open={unref(open)}
                    onUpdate:open={onUpdateOpen}
                >
                    {siderDom}
                </Drawer>
            ) : (
                siderDom
            )

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {needSiderDom}
                    <div class={`${prefixCls.value}-prime`}>
                        {headerDom}
                        <div class={`${prefixCls.value}-content`}>
                            {contentDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
