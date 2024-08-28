import type { PropType, SlotsType, Ref } from 'vue'
import { defineComponent, ref, unref } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFormProps, BaseFormInstance } from '../base-form'
import { BaseForm, baseFormProps } from '../base-form'

const formProps = () => ({
    ...baseFormProps,
    layout: {
        type: String as PropType<'horizontal' | 'inline' | 'vertical'>,
        default: 'vertical'
    }
})

export default defineComponent({
    inheritAttrs: false,
    name: 'ProForm',
    props: formProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
    }>,
    setup (props, { slots, attrs, expose }) {
        const baseFormRef: Ref<BaseFormInstance | null> = ref(null)

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const baseFormProps: BaseFormProps = { ...attrs, ...props }
            return (
                <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={slots}/>
            )
        }
    }
})
