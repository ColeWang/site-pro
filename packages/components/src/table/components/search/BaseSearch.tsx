import type { CSSProperties, Ref, SlotsType } from 'vue'
import { defineComponent, onMounted, ref, unref } from 'vue'
import { Card, theme } from 'ant-design-vue'
import { toPx } from '@site-pro/utils'
import { pick } from 'lodash-es'
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

            const cardStyle: CSSProperties = {
                marginBlockEnd: toPx(sizeMS)
            }

            const queryFilterProps: QueryFilterProps = {
                ...pick(props, Object.keys(QueryFilter.props)) as QueryFilterProps,
                onFormRef: onBaseFormRef
            }

            return (
                <Card style={cardStyle} {...attrs}>
                    <QueryFilter {...queryFilterProps} v-slots={slots}/>
                </Card>
            )
        }
    }
})
