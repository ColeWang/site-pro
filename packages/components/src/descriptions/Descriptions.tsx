import type { App, Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider, Descriptions as AntDescriptions, Form, Spin } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { BaseAttrs, BaseSlot, Recordable } from '@site-pro/utils'
import { flattenChildren, getElement, getPropsSlot, getSlotVNode } from '@site-pro/utils'
import { isFunction, omit, pick } from 'lodash-es'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../base-field'
import { BaseField } from '../base-field'
import type { TableColumn } from '../table'
import useFetchData from './hooks/useFetchData.ts'
import type { DescriptionsItemProps } from './typings'
import { descriptionsProps } from './typings'
import useStyle from './style'

const Descriptions = defineComponent({
    inheritAttrs: false,
    name: 'ProDescriptions',
    props: descriptionsProps(),
    emits: ['load', 'requestError'],
    setup (props, { emit, slots, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-descriptions', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const popupContainer: Ref<HTMLElement | null> = ref(null)

        const { context: requestProps, onReload } = useFetchData(props.request, props, {
            manualRequest: !props.request,
            onLoad: (dataSource: any[]) => emit('load', dataSource),
            onRequestError: (err: Error) => emit('requestError', err)
        })

        function schemaToDescsItem (columns: (TableColumn & DescriptionsItemProps)[], emptyText?: string) {
            return columns.map((item, index) => {
                const { fieldProps, formItemProps, __SLOTS__: itemSlots } = item
                const { valueType, dataIndex, name, label } = item

                const namePath = name || dataIndex || item.key
                const title = isFunction(item.title) ? item.title() : (item.title || label)

                const descsItemProps: DescriptionsItemProps = {
                    ...pick(item, Object.keys(Descriptions.Item.props)) as DescriptionsItemProps,
                    key: item.key || label || index,
                    label: title
                }
                const needItemSlots: Recordable<BaseSlot> = pick(itemSlots, ['label'])
                if (!valueType && !namePath) {
                    const children = itemSlots.default && itemSlots.default(requestProps.dataSource)
                    return (
                        <Descriptions.Item {...descsItemProps} v-slots={needItemSlots}>
                            {children ?? emptyText}
                        </Descriptions.Item>
                    )
                }

                const needFormItemProps: BaseFieldFormItemProps = {
                    ...pick(item, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                    ...formItemProps,
                    name: namePath,
                    model: requestProps.dataSource
                }
                const needFieldProps: BaseFieldProps = {
                    ...pick(item, Object.keys(BaseField.props)) as BaseFieldProps,
                    mode: 'read',
                    emptyText: emptyText,
                    fieldProps: fieldProps,
                    formItemProps: needFormItemProps
                }
                const fieldSlots: Recordable<BaseSlot> = omit(itemSlots, ['label'])
                return (
                    <Descriptions.Item {...descsItemProps} v-slots={needItemSlots}>
                        <BaseField {...needFieldProps} v-slots={fieldSlots}/>
                    </Descriptions.Item>
                )
            })
        }

        function getColumns (children, columns) {
            const childrenColumns = children.map((item) => {
                const slots = omit((item.children || {}), ['_ctx'])
                return { ...item.props, __SLOTS__: slots }
            })
            return [...columns, ...childrenColumns]
                .filter((item) => !item.hide && !item.hideInDescriptions)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        expose({ reload: onReload })

        return () => {
            const { columns, emptyText } = props

            const nodes = flattenChildren(slots.default ? slots.default() : [])

            const schemaColumns = getColumns(nodes, columns)
            const children = schemaToDescsItem(schemaColumns, emptyText)

            const slotScope = {
                loading: requestProps.loading,
                data: requestProps.dataSource
            }
            const titleDom = getPropsSlot(slots, props, 'title', slotScope)
            const extraDom = getSlotVNode(slots, props, 'extra', slotScope)

            const restProps = omit(props, ['title', 'extra'])
            const needDescsProps = { ...pick(restProps, Object.keys(Descriptions.props)) }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                {(titleDom || extraDom) && (
                                    <div class={`${prefixCls.value}-header`}>
                                        <div class={`${prefixCls.value}-title`}>
                                            {titleDom}
                                        </div>
                                        <div class={`${prefixCls.value}-extra`}>
                                            {extraDom}
                                        </div>
                                    </div>
                                )}
                                <Spin spinning={requestProps.loading}>
                                    <AntDescriptions {...needDescsProps}>
                                        {children}
                                    </AntDescriptions>
                                </Spin>
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})

Descriptions.install = function (app: App): App {
    app.component(Descriptions.name as string, Descriptions)
    return app
}

export default Descriptions
