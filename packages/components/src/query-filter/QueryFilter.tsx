import type { App, Ref, VNode } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import { Col, Form, Row, theme } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import type { RowProps } from '@site-pro/utils'
import { flattenChildren } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { ResizeObserverRectSize } from '../resize-observer'
import { ResizeObserver } from '../resize-observer'
import type { BaseFormInstance, BaseFormProps } from '../base-form'
import { BaseForm } from '../base-form'
import type { QueryFilterActionsProps } from './Actions'
import Actions from './Actions'
import useQueryFilter from './hooks/useQueryFilter'
import { genFormItemFixStyle } from '../share-utils'
import { queryFilterProps } from './typings'
import useStyle from './style'

const QueryFilter = defineComponent({
    inheritAttrs: false,
    name: 'ProQueryFilter',
    props: queryFilterProps(),
    emits: ['resize', 'collapse'],
    setup (props, { emit, slots, attrs, expose }) {
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
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function onReset (): void {
            const context = unref(baseFormRef)
            context && context.resetFields()
        }

        function onCollapse (value: boolean): void {
            setCollapse && setCollapse(value)
            emit('collapse', value)
        }

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const { labelWidth, rowProps } = props
            const { sizeMD, sizeMS, sizeLG } = unref(token)

            const formItemProps = genFormItemFixStyle(labelWidth || sizeMD * 4, unref(layout))
            const slotScope = { layout: unref(layout), props: formItemProps }

            const children: VNode[] = flattenChildren(slots.default ? slots.default(slotScope) : [])
            const { nodes: colNodes, offset, haveRow } = genColNodes(children, (item) => {
                const { child: fieldNode, hidden, key } = item || {}
                const colClass = { [`${prefixCls.value}-col-hidden`]: hidden }
                return (
                    <Col key={key} class={colClass} span={unref(span)}>
                        {() => fieldNode}
                    </Col>
                )
            })

            const baseFormProps: BaseFormProps = {
                ...(pick(props, Object.keys(BaseForm.props)) as BaseFormProps),
                layout: unref(layout),
                grid: false
            }

            const actionsProps: QueryFilterActionsProps = {
                ...(pick(props, Object.keys(Actions.props)) as QueryFilterActionsProps),
                collapsed: unref(collapsed),
                onSubmit: onSubmit,
                onReset: onReset,
                onCollapse: onCollapse
            }

            const needRowProps: RowProps = {
                gutter: [sizeMS, sizeLG],
                ...rowProps,
                justify: 'start'
            }
            const formItemClass = {
                [`${prefixCls.value}-form-item__vertical`]: unref(layout) === 'vertical' && !haveRow
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <BaseForm {...baseFormProps} ref={baseFormRef}>
                            <Row {...needRowProps}>
                                {colNodes}
                                <Col
                                    class={`${prefixCls.value}-action-col`}
                                    span={unref(span)}
                                    offset={offset}
                                    key={'action'}
                                >
                                    <Form.Item class={formItemClass} colon={false}>
                                        <Actions {...actionsProps}/>
                                    </Form.Item>
                                </Col>
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
