import type { ComponentPublicInstance, ExtractPropTypes, PropType, Ref } from 'vue'
import { cloneVNode, defineComponent, onMounted, ref, unref } from 'vue'
import { Card, theme } from 'ant-design-vue'
import { flattenChildren, isValidElement } from '@site-pro/utils'
import type { QueryFilterInstance, QueryFilterProps } from '../../../query-filter'
import { QueryFilter, queryFilterProps } from '../../../query-filter'
import { merge, pick } from 'lodash-es'

export const baseSearchProps = () => ({
    ...queryFilterProps(),
    manualRequest: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export type BaseSearchProps = Partial<ExtractPropTypes<ReturnType<typeof baseSearchProps>>>;
export type BaseSearchInstance = ComponentPublicInstance<BaseSearchProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableBaseSearch',
    props: baseSearchProps(),
    setup (props, { slots, attrs }) {
        const queryFilterRef: Ref<QueryFilterInstance | null> = ref(null)

        const { token } = theme.useToken()

        onMounted(() => {
            !props.manualRequest && onSubmit()
        })

        function onSubmit () {
            const context = unref(queryFilterRef)
            if (context && context.getFormInstance) {
                const formInstance = context.getFormInstance()
                formInstance && formInstance.submit()
            }
        }

        return () => {
            const { sizeMS } = unref(token)

            const children = flattenChildren(slots.default ? slots.default() : [])

            const queryFilterProps: QueryFilterProps = pick(props, Object.keys(QueryFilter.props))
            return (
                <Card style={{ marginBlockEnd: `${sizeMS}px` }} {...attrs}>
                    <QueryFilter {...queryFilterProps} ref={queryFilterRef}>
                        {(slotScope: any) => {
                            return children.map((vNode) => {
                                if (!isValidElement(vNode)) return vNode
                                const { fieldProps, formItemProps } = vNode.props as any
                                const extraProps = {
                                    fieldProps: merge({ style: { width: '100%' } }, fieldProps),
                                    formItemProps: { ...formItemProps, ...slotScope.props }
                                }
                                return cloneVNode(vNode, extraProps)
                            })
                        }}
                    </QueryFilter>
                </Card>
            )
        }
    }
})
