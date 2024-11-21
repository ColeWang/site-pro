import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, Ref, SlotsType, VNodeChild } from 'vue'
import { computed, defineComponent, ref, unref } from 'vue'
import { Button, ConfigProvider, Dropdown, Popover, Space, Tooltip } from 'ant-design-vue'
import {
    ColumnHeightOutlined,
    ReloadOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import type { BaseAttrs, BaseSlot, Recordable } from '@site-pro/utils'
import { getElement, getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { pick, toPlainObject } from 'lodash-es'
import type { ResizeObserverRectSize } from '../../../resize-observer'
import { ResizeObserver } from '../../../resize-observer'
import Density from '../density'
import Setting from '../setting'
import type { QueryFilterBreakPoint } from '../../../query-filter'
import useBreakPoint from '../../../query-filter/hooks/useBreakPoint'
import type { UseFetchDataContext } from '../../hooks/useFetchData'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '../../../locale-provider'
import useStyle from './style'

const defaultOptions: Recordable<boolean> = {
    reload: true,
    export: false,
    density: true,
    setting: true
}

export const toolbarProps = () => ({
    options: {
        type: [Boolean, Object],
        default: () => ({})
    },
    compact: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    breakPoints: {
        type: Array as PropType<QueryFilterBreakPoint[]>,
        default: undefined
    },
    title: {
        type: [String, Function] as PropType<string | BaseSlot>,
        default: undefined
    },
    actions: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    settings: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    }
})

export type ToolbarProps = Partial<ExtractPropTypes<ReturnType<typeof toolbarProps>>>;
export type ToolbarInstance = ComponentPublicInstance<ToolbarProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableToolbar',
    props: toolbarProps(),
    slots: Object as SlotsType<{
        title?: UseFetchDataContext;
        actions?: UseFetchDataContext;
        settings?: UseFetchDataContext;
    }>,
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-toolbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps = {} as Partial<UseFetchDataContext>, onReload, onExport } = useSharedContext()

        const popupContainer: Ref<HTMLElement | null> = ref(null)

        const size: Ref<ResizeObserverRectSize> = ref({ width: 0, height: 0 })

        const { span } = useBreakPoint(size, props as any)

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

            const slotScope: any = { ...requestProps }
            const titleDom: VNodeChild = getPropsSlotVNode(slots, props, 'title', slotScope)
            const actionsDom: VNodeChild = getSlotVNode(slots, props, 'actions', slotScope)

            const renderSettings = () => {
                const vNodeCatalog: Record<string, VNodeChild> = {
                    reload: (
                        <Tooltip title={t('reload')}>
                            <Button onClick={onReloadClick}>
                                <ReloadOutlined spin={requestProps.loading}/>
                            </Button>
                        </Tooltip>
                    ),
                    export: (
                        <Tooltip title={t('export')}>
                            <Button onClick={onExportClick}>
                                <VerticalAlignBottomOutlined/>
                            </Button>
                        </Tooltip>
                    ),
                    density: (
                        <Tooltip title={t('density')}>
                            <Dropdown trigger={['click']} placement={'bottomRight'} v-slots={{
                                overlay: () => <Density/>
                            }}>
                                <Button>
                                    <ColumnHeightOutlined/>
                                </Button>
                            </Dropdown>
                        </Tooltip>
                    ),
                    setting: (
                        <Tooltip title={t('columnSetting')}>
                            <Popover trigger={'click'} placement={'bottomRight'} v-slots={{
                                content: () => <Setting/>
                            }}>
                                <Button>
                                    <SettingOutlined/>
                                </Button>
                            </Popover>
                        </Tooltip>
                    )
                }

                const options: Recordable<boolean> = pick({ ...defaultOptions, ...toPlainObject(propsOptions) }, Object.keys(defaultOptions))
                const defaultSettings: any[] = Object.keys(options)
                    .filter((key) => options[key])
                    .map((key) => vNodeCatalog[key])

                const customSettings: VNodeChild = getSlotVNode(slots, props, 'settings', slotScope)
                return (
                    <Space.Compact>{customSettings || defaultSettings}</Space.Compact>
                )
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <ConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={[`${prefixCls.value}-container`, wrapCls.value]}>
                                    {titleDom || actionsDom ? (
                                        <div class={`${prefixCls.value}-header`}>
                                            <div class={`${prefixCls.value}-title`}>
                                                {titleDom}
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
                        </ConfigProvider>
                    </ResizeObserver>
                </div>
            )
        }
    }
})
