import type { Ref, SlotsType, VNode } from 'vue'
import { cloneVNode, defineComponent, onMounted, ref, unref } from 'vue'
import { Card, theme } from 'ant-design-vue'
import { flattenChildren, isValidElement, toPx } from '@site-pro/utils'
import { merge, pick } from 'lodash-es'
import type { BaseFieldProps } from '../../../base-field'
import type { BaseFormInstance } from '../../../base-form'
import type { QueryFilterProps } from '../../../query-filter'
import { QueryFilter } from '../../../query-filter'
import type { BaseSearchSlots } from './typings'
import { baseSearchProps } from './typings'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProTableBaseSearch',
    props: baseSearchProps(),
    slots: Object as SlotsType<BaseSearchSlots>,
    setup (props, { slots, attrs }) {
        const baseFormRef: Ref<BaseFormInstance | null> = ref(null)

        const { token } = theme.useToken()

        onMounted(() => {
            !props.manualRequest && onSubmit()
        })

        function onSubmit () {
            const context: BaseFormInstance | null = unref(baseFormRef)
            context && context.submit()
        }

        function onBaseFormRef (el: any): void {
            baseFormRef.value = el
        }

        return () => {
            const { sizeMS } = unref(token)

            const children: VNode[] = flattenChildren(slots.default ? slots.default() : [])

            const queryFilterProps: QueryFilterProps = pick(props, Object.keys(QueryFilter.props))
            return (
                <Card style={{ marginBlockEnd: toPx(sizeMS) }} {...attrs}>
                    <QueryFilter {...queryFilterProps} onFormRef={onBaseFormRef}>
                        {children.map((child) => {
                            if (!isValidElement(child)) return child
                            const { fieldProps } = child.props as any || {}
                            const extraProps: Partial<BaseFieldProps> = {
                                fieldProps: merge({
                                    style: { width: '100%' }
                                }, fieldProps || {})
                            }
                            return cloneVNode(child, extraProps)
                        })}
                    </QueryFilter>
                </Card>
            )
        }
    }
})
