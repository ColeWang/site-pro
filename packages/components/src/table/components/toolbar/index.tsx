import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { Button, ConfigProvider, Dropdown, Popover, Space, Tooltip } from 'ant-design-vue'
import {
    ColumnHeightOutlined,
    ReloadOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { getElement, getSlotVNode } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { pick, toPlainObject } from 'lodash-es'
import type { ResizeObserverRectSize } from '../../../resize-observer'
import { ResizeObserver } from '../../../resize-observer'
import Density from '../density'
import Setting from '../setting'
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
    title: {
        type: Function as PropType<BaseSlot>,
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
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-toolbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps = {} as Partial<UseFetchDataContext>, onReload, onExport } = useSharedContext()

        const popupContainer: Ref<HTMLElement | null> = ref(null)

        const size: Ref<ResizeObserverRectSize> = ref({ width: 0, height: 0 })

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

            const slotScope: any = {
                loading: requestProps.loading,
                pagination: requestProps.pagination,
                pageData: requestProps.dataSource
            }
            const titleDom = getSlotVNode(slots, props, 'title', slotScope)
            const actionsDom = getSlotVNode(slots, props, 'actions', slotScope)

            const renderSettings = () => {
                const vNodeCatalog: Record<string, any> = {
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

                const customSettings = getSlotVNode(slots, props, 'settings', slotScope)
                return (
                    <Space.Compact>{customSettings || defaultSettings}</Space.Compact>
                )
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <ConfigProvider getPopupContainer={getPopupContainer}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={[`${prefixCls.value}-container`]}>
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
