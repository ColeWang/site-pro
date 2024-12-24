import Descriptions from './Descriptions'
import DescriptionsItem from './Item'
import type {
    DescriptionsColumn,
    DescriptionsExpose,
    DescriptionsInstance,
    DescriptionsItemInstance,
    DescriptionsItemProps,
    DescriptionsItemSlots,
    DescriptionsProps,
    DescriptionsSlots
} from './typings'
import { createDescriptionsColumn, descriptionsItemProps, descriptionsProps } from './typings'

export { createDescriptionsColumn }
export { Descriptions, descriptionsProps }
export { DescriptionsItem, descriptionsItemProps }

export type { DescriptionsColumn }
export type { DescriptionsSlots, DescriptionsProps, DescriptionsExpose, DescriptionsInstance }
export type { DescriptionsItemSlots, DescriptionsItemProps, DescriptionsItemInstance }
