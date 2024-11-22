import type { App, Ref, SlotsType, VNode, VNodeChild } from 'vue'
import { cloneVNode, defineComponent, ref, unref } from 'vue'
import { Col, Form, Row, theme } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { BaseClass, RowProps } from '@site-pro/utils'
import { flattenChildren, getPropByKebabOrCamel } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { ResizeObserverRectSize } from '../resize-observer'
import { ResizeObserver } from '../resize-observer'
import type { BaseFormInstance, BaseFormProps } from '../base-form'
import { BaseForm } from '../base-form'
import type { QueryFilterActionsProps } from './Actions'
import Actions from './Actions'
import useQueryFilter from './hooks/useQueryFilter'
import type { QueryFilterSlots } from './typings'
import { queryFilterProps } from './typings'
import useStyle from './style'

const QueryFilter = defineComponent({
    inheritAttrs: false,
    name: 'ProQueryFilter',
    props: queryFilterProps(),
    slots: Object as SlotsType<QueryFilterSlots>,
    emits: ['formRef', 'resize', 'collapse'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-query-filter', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

        const baseFormRef: Ref<BaseFormInstance | null> = ref(null)

        const size: Ref<ResizeObserverRectSize> = ref({ width: 0, height: 0 })

        const { layout, span, collapsed, setCollapse, genColNodes } = useQueryFilter(size, props)

        function onResize (value: ResizeObserverRectSize): void {
            size.value = value
            emit('resize', value)
        }

        function onSubmit (): void {
            const context: BaseFormInstance | null = unref(baseFormRef)
            context && context.submit()
        }

        function onReset (): void {
            const context: BaseFormInstance | null = unref(baseFormRef)
            context && context.resetFields()
        }

        function onCollapse (value: boolean): void {
            setCollapse && setCollapse(value)
            emit('collapse', value)
        }

        function onBaseFormRef (el: any): void {
            baseFormRef.value = el
            emit('formRef', el)
        }

        return () => {
            const { labelWidth, rowProps } = props
            const { sizeMD, sizeMS, sizeLG } = unref(token)

            const children: VNode[] = flattenChildren(slots.default ? slots.default() : [])
            const { nodes: colNodes, offset, haveRow } = genColNodes(children, (item) => {
                const { child, hidden, key } = item
                const fieldLabelWidth: number | 'auto' | undefined = child.props && getPropByKebabOrCamel(child.props, 'label-width')
                // 默认宽度 80px sizeMD * 4
                const fieldNode: VNode = cloneVNode(child, {
                    labelWidth: fieldLabelWidth || labelWidth || sizeMD * 4
                })
                const colClass: BaseClass = { [`${prefixCls.value}-col-hidden`]: hidden }
                return (
                    <Col key={key} class={colClass} span={unref(span)}>
                        {() => fieldNode}
                    </Col>
                )
            })

            const baseFormProps: BaseFormProps = {
                ...pick(props, Object.keys(BaseForm.props)) as BaseFormProps,
                layout: unref(layout),
                grid: false
            }

            const actionsProps: QueryFilterActionsProps = {
                ...pick(props, Object.keys(Actions.props)) as QueryFilterActionsProps,
                collapsed: unref(collapsed),
                onSubmit: onSubmit,
                onReset: onReset,
                onCollapse: onCollapse
            }

            const needRowProps: RowProps = Object.assign({
                gutter: [sizeMS, sizeLG],
                justify: 'start'
            }, rowProps)

            const formItemClass: BaseClass = {
                [`${prefixCls.value}-form-item__vertical`]: unref(layout) === 'vertical' && !haveRow
            }
            const actionDom: VNodeChild = (
                <Col class={`${prefixCls.value}-action-col`} span={unref(span)} offset={offset} key={'action'}>
                    <Form.Item class={formItemClass} colon={false}>
                        <Actions {...actionsProps}/>
                    </Form.Item>
                </Col>
            )

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <BaseForm {...baseFormProps} ref={onBaseFormRef}>
                            <Row {...needRowProps}>
                                {colNodes}
                                {actionDom}
                            </Row>
                        </BaseForm>
                    </ResizeObserver>
                </div>
            )
        }
    }
})

QueryFilter.install = function (app: App): App {
    app.component(QueryFilter.name as string, QueryFilter)
    return app
}

export default QueryFilter
