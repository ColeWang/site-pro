import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { colProps as antColProps } from 'ant-design-vue/es/grid/Col'
import { Col } from 'ant-design-vue'
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
            const { grid } = props
            const children: VNodeChild = slots.default && slots.default()

            if (grid) {
                const needColProps: ColProps = pick(props, Object.keys(Col.props)) as ColProps
                if (!needColProps.span && !needColProps.xs) {
                    needColProps.xs = 24
                }
                return <Col {...needColProps}>{children}</Col>
            }
            return children
        }
    }
})
