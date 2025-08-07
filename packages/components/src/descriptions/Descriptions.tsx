import type { App, Plugin, Ref, SlotsType, VNode, VNodeChild } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import {
    ConfigProvider as AntConfigProvider,
    Descriptions as AntDescriptions,
    Form as AntForm,
    Spin as AntSpin,
    Tooltip as AntTooltip,
    Typography as AntTypography,
} from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import {
    convertToCamelCaseProps,
    flatVNodeChildren,
    getElement,
    getPropsSlotVNode,
    getSlotVNode,
    safeDestructureObject
} from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { isFunction, isString, omit, pick } from 'lodash-es'
import DescriptionsItem from './Item'
import useFetchData from './hooks/useFetchData'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../base-field'
import { BaseField } from '../base-field'
import type { DescriptionsItemProps, DescriptionsProps, DescriptionsSlots } from './typings'
import { descriptionsProps } from './typings'
import useStyle from './style'

interface CreateDescsItemOptions {
    dataSource: Recordable;
    prefixCls: string;
    emptyText: string;
}

function createDescsItem (
    props: DescriptionsItemProps,
    slots: Recordable<BaseSlot>,
    options: CreateDescsItemOptions
): VNodeChild {
    const { text, valueType, formItemProps, ellipsis, copyable } = props
    const { dataSource, prefixCls, emptyText } = options

    // text 可以个函数
    const needText: VNodeChild = isFunction(text) ? text(dataSource) : text

    const label: VNodeChild = getPropsSlotVNode(slots, props, 'label')

    const tooltip: VNodeChild = getPropsSlotVNode(slots, props, 'tooltip')
    const tooltipDom: VNodeChild = isString(tooltip) ? (
        <span class={`${prefixCls}-item-tooltip`}>
            <AntTooltip title={tooltip}>
                <QuestionCircleOutlined/>
            </AntTooltip>
        </span>
    ) : tooltip

    const descsItemProps: DescriptionsItemProps = pick(props, Object.keys(AntDescriptions.Item.props))
    const needDescsItemProps: DescriptionsItemProps = omit(descsItemProps, ['label'])

    const descsItemSlots: Recordable<BaseSlot> = {
        label: () => [label, tooltipDom]
    }

    if (valueType) {
        const needFormItemProps: BaseFieldFormItemProps = {
            ...pick(props, Object.keys(AntForm.Item.props)) as BaseFieldFormItemProps,
            ...formItemProps,
            model: dataSource
        }
        const needBaseFieldProps: BaseFieldProps = {
            ...pick(props, Object.keys(BaseField.props)) as BaseFieldProps,
            mode: 'read',
            formItemProps: needFormItemProps
        }

        const baseFieldSlots: Recordable<BaseSlot> = omit(slots, ['label', 'tooltip'])
        return (
            <AntDescriptions.Item {...needDescsItemProps} v-slots={descsItemSlots}>
                <BaseField {...needBaseFieldProps} v-slots={baseFieldSlots}/>
            </AntDescriptions.Item>
        )
    }

    // 当非 BaseField 时支持 ellipsis 与 copyable 必须传递 text
    if ((ellipsis || copyable) && isString(needText)) {
        return (
            <AntDescriptions.Item {...needDescsItemProps} v-slots={descsItemSlots}>
                <AntTypography.Text
                    ellipsis={ellipsis}
                    copyable={copyable}
                    content={needText}
                />
            </AntDescriptions.Item>
        )
    }

    const childDom: VNodeChild = slots.default && slots.default()

    return (
        <AntDescriptions.Item {...needDescsItemProps} v-slots={descsItemSlots}>
            {needText ?? childDom ?? emptyText}
        </AntDescriptions.Item>
    )
}

const Descriptions = defineComponent({
    compatConfig: { MODE: 3 },
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
            onLoad: (dataSource: any[]) => emit('load', dataSource),
            onRequestError: (err: Error) => emit('requestError', err)
        })

        onMounted(() => {
            // 初始化 发起请求
            !props.manualRequest && onReload()
        })

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        expose({ reload: onReload })

        return () => {
            const { emptyText } = props

            const title: VNodeChild = getPropsSlotVNode(slots, props, 'title', requestProps)
            const extraDom: VNodeChild = getSlotVNode(slots, props, 'extra', requestProps)

            const descsProps: DescriptionsProps = pick(props, Object.keys(AntDescriptions.props))
            const needDescsProps: DescriptionsProps = omit(descsProps, ['title', 'extra'])

            const nodes: VNode[] = flatVNodeChildren(slots.default ? slots.default() : [])

            const children: VNodeChild[] = nodes.map((child) => {
                const childProps: Recordable = convertToCamelCaseProps(child.props || {})
                const childSlots: Recordable<BaseSlot> = safeDestructureObject(child.children)

                return createDescsItem(childProps, childSlots, {
                    dataSource: requestProps.dataSource,
                    prefixCls: prefixCls.value,
                    emptyText: emptyText
                })
            })

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <AntConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                {(title || extraDom) && (
                                    <div class={`${prefixCls.value}-header`}>
                                        <div class={`${prefixCls.value}-title`}>
                                            {title}
                                        </div>
                                        <div class={`${prefixCls.value}-extra`}>
                                            {extraDom}
                                        </div>
                                    </div>
                                )}
                                <AntSpin spinning={requestProps.loading}>
                                    <AntDescriptions {...needDescsProps}>
                                        {children}
                                    </AntDescriptions>
                                </AntSpin>
                            </div>
                        </div>
                    </AntConfigProvider>
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
