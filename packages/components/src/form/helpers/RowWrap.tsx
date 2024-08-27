import type { ComponentPublicInstance, ExtractPropTypes, PropType, SlotsType, VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { Row } from 'ant-design-vue'
import { rowProps } from 'ant-design-vue/es/grid/Row'
import type { BaseSlot } from '@site-pro/utils'
import { pick } from 'lodash-es'
import type { RowProps } from '../../ant-typings'

const rowWarpProps = () => ({
    ...rowProps(),
    grid: {
        type: Boolean as PropType<boolean>,
        default: false
    }
})

export type RowWrapProps = Partial<ExtractPropTypes<ReturnType<typeof rowWarpProps>>>;
export type RowWrapInstance = ComponentPublicInstance<RowWrapProps>;

export default defineComponent({
    inheritAttrs: false,
    name: 'ProRowWrap',
    props: rowWarpProps(),
    slots: Object as SlotsType<{
        default?: BaseSlot;
    }>,
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
