import Descriptions from './Descriptions'
import DescriptionsItem from './Item'
import type {
    DescriptionsColumn,
    DescriptionsExpose,
    DescriptionsInstance,
    DescriptionsItemInstance,
    DescriptionsItemProps,
    DescriptionsProps
} from './typings'
import { descriptionsItemProps, descriptionsProps } from './typings'

Descriptions.Item = DescriptionsItem

export { Descriptions, descriptionsProps }
export { DescriptionsItem, descriptionsItemProps }

export type { DescriptionsColumn, DescriptionsProps, DescriptionsExpose, DescriptionsInstance }
export type { DescriptionsItemProps, DescriptionsItemInstance }
