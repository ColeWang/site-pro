import type { PropType } from 'vue'
import { descriptionsProps as antDescriptionsProps } from 'ant-design-vue/es/descriptions'
import type { Recordable } from '@site-pro/utils'

export const descriptionsProps = () => ({
    ...antDescriptionsProps(),
    request: {
        type: Function,
        default: undefined
    },
    params: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    dataSource: {
        type: Object as PropType<Recordable>,
        default: () => ({})
    },
    columns: {
        type: Array ,
        default: () => ([])
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    },
    onLoad: {
        type: Function as PropType<(dataSource: Recordable) => void>,
        default: undefined
    },
    onRequestError: {
        type: Function as PropType<(err: Error) => void>,
        default: undefined
    }
})
