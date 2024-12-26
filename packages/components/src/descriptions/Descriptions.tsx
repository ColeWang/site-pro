import type { App, Plugin, Ref, SlotsType, VNode, VNodeChild } from 'vue'
import { defineComponent, ref } from 'vue'
import { ConfigProvider, Descriptions as AntDescriptions, Spin } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import {
    convertToCamelCaseProps,
    flatVNodeChildren,
    getElement,
    getPropsSlotVNode,
    getSlotVNode,
    namePathToString,
    safeDestructureObject
} from '@site-pro/utils'
import { omit, pick } from 'lodash-es'
import DescriptionsItem from './Item'
import useFetchData from './hooks/useFetchData'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../base-field'
import { BaseField } from '../base-field'
import type { DescriptionsItemProps, DescriptionsProps, DescriptionsSlots } from './typings'
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

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        expose({ reload: onReload })

        return () => {
            const { emptyText } = props

            const titleDom: VNodeChild = getPropsSlotVNode(slots, props, 'title', requestProps)
            const extraDom: VNodeChild = getSlotVNode(slots, props, 'extra', requestProps)

            const restProps: DescriptionsProps = omit(props, ['title', 'extra'])
            const needDescsProps: DescriptionsProps = {
                ...pick(restProps, Object.keys(Descriptions.props)) as DescriptionsProps
            }

            const nodes: VNode[] = flatVNodeChildren(slots.default ? slots.default() : [])

            const children: VNode[] = nodes.map((child, index) => {
                const childProps: Recordable = convertToCamelCaseProps(child.props || {})
                const childSlots: Recordable<BaseSlot> = safeDestructureObject(child.children)

                const key: string = namePathToString(childProps.name || childProps.key || index)

                const descsItemProps: DescriptionsItemProps = {
                    ...pick(childProps, Object.keys(AntDescriptions.Item.props)) as DescriptionsItemProps,
                    label: getPropsSlotVNode(childSlots, childProps, 'label', requestProps)
                }

                if (childProps.valueType) {
                    const needFormItemProps: BaseFieldFormItemProps = {
                        model: requestProps.dataSource,
                        name: childProps.name || childProps.key
                    }
                    const needFieldProps: BaseFieldProps = {
                        ...pick(childProps, Object.keys(BaseField.props)) as BaseFieldProps,
                        mode: 'read',
                        emptyText: emptyText,
                        formItemProps: needFormItemProps
                    }
                    const baseFieldSlots: Recordable<BaseSlot> = omit(childSlots, ['default', 'label'])
                    return (
                        <Descriptions.Item {...descsItemProps} key={key}>
                            <BaseField {...needFieldProps} v-slots={baseFieldSlots}/>
                        </Descriptions.Item>
                    )
                }

                const childDefaultDom: VNodeChild = getSlotVNode(childSlots, {}, 'default', requestProps)
                return (
                    <Descriptions.Item {...descsItemProps} key={key}>
                        {childDefaultDom || emptyText}
                    </Descriptions.Item>
                )
            })

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

Descriptions.Item = DescriptionsItem

export default Descriptions as typeof Descriptions & Plugin & {
    readonly Item: typeof DescriptionsItem;
}
