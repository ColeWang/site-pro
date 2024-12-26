import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { Row as AntRow } from 'ant-design-vue'
import { rowProps as antRowProps } from 'ant-design-vue/es/grid/Row'
import { pick } from 'lodash-es'
import type { RowProps } from '../../ant-typings'

export const rowWrapperProps = () => ({
    ...antRowProps(),
    grid: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export interface RowWrapperSlots {
    default?: any;
}

export type RowWrapperProps = Partial<ExtractPropTypes<ReturnType<typeof rowWrapperProps>>>;
export type RowWrapperInstance = ComponentPublicInstance<RowWrapperProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProRowWrapper',
    props: rowWrapperProps(),
    slots: Object as SlotsType<RowWrapperSlots>,
    setup (props, { slots }) {
        return () => {
            const { grid } = props

            if (grid) {
                const needRowProps: RowProps = pick(props, Object.keys(AntRow.props)) as RowProps
                return (
                    <AntRow {...needRowProps}>
                        {slots.default && slots.default()}
                    </AntRow>
                )
            }
            return slots.default && slots.default()
        }
    }
})
