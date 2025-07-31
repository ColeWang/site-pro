import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { colProps as antColProps } from 'ant-design-vue/es/grid/Col'
import { Col as AntCol } from 'ant-design-vue'
import type { BaseAttrs } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { ColProps } from '../../ant-typings'

export const colWrapperProps = () => ({
    ...antColProps(),
    hidden: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    grid: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export interface ColWrapperSlots {
    default?: any;
}

export type ColWrapperProps = Partial<ExtractPropTypes<ReturnType<typeof colWrapperProps>>>;
export type ColWrapperInstance = ComponentPublicInstance<ColWrapperProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProColWrapper',
    props: colWrapperProps(),
    slots: Object as SlotsType<ColWrapperSlots>,
    setup (props, { slots }) {
        return () => {
            const { grid, hidden } = props

            if (grid) {
                const needColProps: ColProps = pick(props, Object.keys(AntCol.props))
                if (!needColProps.span && !needColProps.xs) {
                    needColProps.xs = 24
                }
                const colAttrs: BaseAttrs = {
                    style: { display: hidden ? 'none' : 'block' }
                }
                return (
                    <AntCol {...needColProps} {...colAttrs}>
                        {slots.default && slots.default()}
                    </AntCol>
                )
            }
            return slots.default && slots.default()
        }
    }
})
