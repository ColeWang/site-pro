import type { App, ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { Row } from 'ant-design-vue'
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

const RowWrapper = defineComponent({
    inheritAttrs: false,
    name: 'ProRowWrapper',
    props: rowWrapperProps(),
    slots: Object as SlotsType<RowWrapperSlots>,
    setup (props, { slots }) {
        return () => {
            const { grid } = props
            const children: VNodeChild = slots.default && slots.default()

            if (grid) {
                const needRowProps: RowProps = pick(props, Object.keys(Row.props)) as RowProps
                return <Row {...needRowProps}>{children}</Row>
            }
            return children
        }
    }
})

RowWrapper.install = function (app: App): App {
    app.component(RowWrapper.name as string, RowWrapper)
    return app
}

export default RowWrapper
