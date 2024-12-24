import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { preventDefault } from '@site-pro/utils'

export const tooltipProps = () => ({
    columnKey: {
        type: String as PropType<string>,
        default: undefined
    },
    title: {
        type: String as PropType<string>,
        default: undefined
    },
    fixed: {
        type: String as PropType<string>,
        default: undefined
    },
    onChange: {
        type: Function as PropType<(fixed: boolean) => void>,
        default: undefined
    }
})

export interface TooltipSlots {
    default?: any;
}

export type TooltipProps = Partial<ExtractPropTypes<ReturnType<typeof tooltipProps>>>;
export type TooltipInstance = ComponentPublicInstance<TooltipProps>;

export default defineComponent({
    inheritAttrs: false,
    props: tooltipProps(),
    emits: ['change'],
    slots: Object as SlotsType<TooltipSlots>,
    setup (props, { emit, slots }) {
        /* v8 ignore next 4 */
        function onClick (evt: Event): void {
            preventDefault(evt, true)
            emit('change', props.fixed)
        }

        return () => {
            const { title } = props

            return (
                <Tooltip title={title}>
                    <span onClick={onClick}>
                        {slots.default && slots.default()}
                    </span>
                </Tooltip>
            )
        }
    }
})

