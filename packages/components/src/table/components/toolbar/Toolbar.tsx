import type { ComputedRef, Ref, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, ref, unref } from 'vue'
import {
    Button as AntButton,
    ConfigProvider as AntConfigProvider,
    Dropdown as AntDropdown,
    Popover as AntPopover,
    Space as AntSpace,
    Tooltip as AntTooltip
} from 'ant-design-vue'
import {
    ColumnHeightOutlined,
    ReloadOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import type { BaseAttrs, Recordable } from '@site-pro/utils'
import { getElement, getPropsSlotVNode, getSlotVNode, safeDestructureObject } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { pick } from 'lodash-es'
import { useBreakPoint } from '../../../query-filter'
import type { ResizeObserverRectSize } from '../../../resize-observer'
import { ResizeObserver } from '../../../resize-observer'
import { Density } from '../density'
import { Setting } from '../setting'
import type { UseFetchDataContext } from '../../hooks/useFetchData'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useConfigReceiverExtended } from '../../../config-provider'
import { useLocaleReceiver } from '../../../locale-provider'
import type { ToolbarSlots } from './typings'
import { toolbarProps } from './typings'
import useStyle from './style'

const defaultOptions: Recordable<boolean> = {
    reload: true,
    export: false,
    density: true,
    setting: true
}

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableToolbar',
    props: toolbarProps(),
    slots: Object as SlotsType<ToolbarSlots>,
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-toolbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps = {} as Partial<UseFetchDataContext>, onReload, onExport } = useSharedContext()

        const popupContainer: Ref<HTMLElement | null> = ref(null)

        const size: Ref<ResizeObserverRectSize> = ref({ width: 0, height: 0 })

        // 断点同步 QueryFilter
        const { extended } = useConfigReceiverExtended('QueryFilter')
        const { span } = useBreakPoint(size, extended)

        // 换行
        const wrapCls: ComputedRef<BaseAttrs> = computed(() => {
            return { [`${prefixCls.value}-container__word-wrap`]: unref(span) === 24 }
        })

        function onResize (value: ResizeObserverRectSize): void {
            size.value = value
        }

        function onReloadClick (): void {
            onReload && onReload()
        }

        function onExportClick (): void {
            onExport && onExport()
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        return () => {
            const { options: propsOptions } = props

            const title: VNodeChild = getPropsSlotVNode(slots, props, 'title', requestProps)
            const actionsDom: VNodeChild = getSlotVNode(slots, props, 'actions', requestProps)

            const renderSettings = () => {
                const vNodeCatalog: Record<string, VNodeChild> = {
                    reload: (
                        <AntTooltip title={t('reload')}>
                            <AntButton onClick={onReloadClick}>
                                <ReloadOutlined spin={requestProps.loading}/>
                            </AntButton>
                        </AntTooltip>
                    ),
                    export: (
                        <AntTooltip title={t('export')}>
                            <AntButton onClick={onExportClick}>
                                <VerticalAlignBottomOutlined/>
                            </AntButton>
                        </AntTooltip>
                    ),
                    density: (
                        <AntTooltip title={t('density')}>
                            <AntDropdown trigger={['click']} placement={'bottomRight'} v-slots={{
                                overlay: () => <Density/>
                            }}>
                                <AntButton>
                                    <ColumnHeightOutlined/>
                                </AntButton>
                            </AntDropdown>
                        </AntTooltip>
                    ),
                    setting: (
                        <AntTooltip title={t('columnSetting')}>
                            <AntPopover trigger={'click'} placement={'bottomRight'} v-slots={{
                                content: () => <Setting/>
                            }}>
                                <AntButton>
                                    <SettingOutlined/>
                                </AntButton>
                            </AntPopover>
                        </AntTooltip>
                    )
                }

                const options: Recordable<boolean> = pick({
                    ...defaultOptions,
                    ...safeDestructureObject(propsOptions)
                }, Object.keys(defaultOptions))

                const defaultDom: any[] = Object.keys(options)
                    .filter((key) => options[key])
                    .map((key) => vNodeCatalog[key])

                const customDom: VNodeChild = getSlotVNode(slots, props, 'settings', requestProps)
                return (
                    <AntSpace.Compact>{customDom || defaultDom}</AntSpace.Compact>
                )
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <AntConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={[`${prefixCls.value}-container`, wrapCls.value]}>
                                    {title || actionsDom ? (
                                        <div class={`${prefixCls.value}-header`}>
                                            <div class={`${prefixCls.value}-title`}>
                                                {title}
                                            </div>
                                            <div class={`${prefixCls.value}-actions`}>
                                                {actionsDom}
                                            </div>
                                        </div>
                                    ) : (
                                        <div/>
                                    )}
                                    <div class={`${prefixCls.value}-settings`}>
                                        {propsOptions !== false && renderSettings()}
                                    </div>
                                </div>
                            </div>
                        </AntConfigProvider>
                    </ResizeObserver>
                </div>
            )
        }
    }
})
