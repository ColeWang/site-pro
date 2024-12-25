import type { App, Plugin, Ref, SlotsType, VNode, VNodeChild } from 'vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider, Descriptions as AntDescriptions, Form, Spin } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { BaseSlot, NamePath, Recordable } from '@site-pro/utils'
import {
    convertToCamelCaseProps,
    flatVNodeChildren,
    getElement,
    getPropsSlotVNode,
    getSlotVNode,
    safeDestructureObject
} from '@site-pro/utils'
import { isFunction, omit, pick } from 'lodash-es'
import DescriptionsItem from './Item'
import useFetchData from './hooks/useFetchData'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../base-field'
import { BaseField } from '../base-field'
import type { DescriptionsColumn, DescriptionsItemProps, DescriptionsProps, DescriptionsSlots } from './typings'
import { descriptionsProps } from './typings'
import useStyle from './style'

const Descriptions = defineComponent({
    inheritAttrs: false,
    name: 'ProDescriptions',
    props: descriptionsProps(),
    slots: Object as SlotsType<DescriptionsSlots>,
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
                const { __SLOTS__: itemSlots } = item
                const childProps: Recordable = convertToCamelCaseProps(item)

                const key: string | number = childProps.key || childProps.label || index
                const namePath: NamePath = childProps.name || childProps.dataIndex || childProps.key as string

                const title: string | undefined = isFunction(childProps.title) ?
                    (childProps.title as any)(requestProps.dataSource) :
                    (childProps.title || childProps.label)

                const descsItemProps: DescriptionsItemProps = {
                    ...pick(childProps, Object.keys(Descriptions.Item.props)) as DescriptionsItemProps,
                    label: title
                }
                const needItemSlots: Recordable<BaseSlot> = pick(itemSlots!, ['label'])

                if (!childProps.valueType && !namePath) {
                    const slotProps: Recordable = { ...requestProps.dataSource }
                    const children: VNodeChild = getSlotVNode(needItemSlots, {}, 'default', slotProps)
                    return (
                        <Descriptions.Item {...descsItemProps} key={key} v-slots={needItemSlots}>
                            {children ?? emptyText}
                        </Descriptions.Item>
                    )
                }

                const needFormItemProps: BaseFieldFormItemProps = {
                    ...pick(childProps, Object.keys(Form.Item.props)) as BaseFieldFormItemProps,
                    ...safeDestructureObject(childProps.formItemProps) as BaseFieldFormItemProps,
                    name: namePath,
                    model: requestProps.dataSource
                }
                const needFieldProps: BaseFieldProps = {
                    ...pick(childProps, Object.keys(BaseField.props)) as BaseFieldProps,
                    mode: 'read',
                    emptyText: emptyText,
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

            const nodes: VNode[] = flatVNodeChildren(slots.default ? slots.default() : [])

            const schemaColumns: DescriptionsColumn[] = getColumns(nodes, columns)
            const children: VNodeChild = schemaToDescsItem(schemaColumns, emptyText)

            const titleDom: VNodeChild = getPropsSlotVNode(slots, props, 'title', requestProps)
            const extraDom: VNodeChild = getSlotVNode(slots, props, 'extra', requestProps)

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
                                        {() => children}
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

Descriptions.Item = DescriptionsItem

export default Descriptions as typeof Descriptions & Plugin & {
    readonly Item: typeof DescriptionsItem;
}
