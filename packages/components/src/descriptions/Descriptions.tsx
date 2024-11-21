import type { App, Ref, SlotsType, VNode, VNodeChild } from 'vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider, Descriptions as AntDescriptions, Form, Spin } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { BaseSlot, NamePath, Recordable } from '@site-pro/utils'
import { flattenChildren, getElement, getPropsSlotVNode, getSlotVNode } from '@site-pro/utils'
import { isFunction, omit, pick } from 'lodash-es'
import useFetchData from './hooks/useFetchData'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../base-field'
import { BaseField } from '../base-field'
import type { DescriptionsColumn, DescriptionsItemProps, DescriptionsProps } from './typings'
import { descriptionsProps } from './typings'
import useStyle from './style'

const Descriptions = defineComponent({
    inheritAttrs: false,
    name: 'ProDescriptions',
    props: descriptionsProps(),
    slots: Object as SlotsType<{
        default?: any;
        title?: any;
        extra?: any;
    }>,
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

        function schemaToDescsItem (columns: DescriptionsColumn[], emptyText?: string) {
            return columns.map((item, index) => {
                const { fieldProps, formItemProps, __SLOTS__: itemSlots } = item
                const { valueType, dataIndex, name, label } = item

                const key: string | number = item.key || label || index
                const namePath: NamePath = name || dataIndex || item.key as string

                const title: string | undefined = isFunction(item.title) ?
                    (item.title as any)(requestProps.dataSource) :
                    (item.title || label)

                const descsItemProps: DescriptionsItemProps = {
                    ...pick(item, Object.keys(Descriptions.Item.props)) as DescriptionsItemProps,
                    label: title
                }
                const needItemSlots: Recordable<BaseSlot> = pick(itemSlots!, ['label'])

                if (!valueType && !namePath) {
                    const children: VNodeChild = getSlotVNode(needItemSlots, {}, 'default', requestProps.dataSource)
                    return (
                        <Descriptions.Item {...descsItemProps} key={key} v-slots={needItemSlots}>
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
                    <Descriptions.Item {...descsItemProps} key={key} v-slots={needItemSlots}>
                        <BaseField {...needFieldProps} v-slots={fieldSlots}/>
                    </Descriptions.Item>
                )
            })
        }

        function getColumns (children: VNode[], columns: DescriptionsColumn[]): DescriptionsColumn[] {
            const childrenColumns: DescriptionsColumn[] = children.map((item) => {
                const slots: Recordable<BaseSlot> = omit((item.children as any || {}), ['_ctx'])
                return { ...item.props, __SLOTS__: slots } as DescriptionsColumn
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

            const nodes: VNode[] = flattenChildren(slots.default ? slots.default() : [])

            const schemaColumns: DescriptionsColumn[] = getColumns(nodes, columns)
            const children: VNodeChild = schemaToDescsItem(schemaColumns, emptyText)

            const slotScope: any = { ...requestProps }
            const titleDom: VNodeChild = getPropsSlotVNode(slots, props, 'title', slotScope)
            const extraDom: VNodeChild = getSlotVNode(slots, props, 'extra', slotScope)

            const restProps: DescriptionsProps = omit(props, ['title', 'extra'])
            const needDescsProps: DescriptionsProps = {
                ...pick(restProps, Object.keys(Descriptions.props)) as DescriptionsProps
            }

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
