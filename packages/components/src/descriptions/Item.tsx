import type { App, SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { DescriptionsItemSlots } from './typings'
import { descriptionsItemProps } from './typings'

const DescriptionsItem = defineComponent({
    inheritAttrs: false,
    name: 'ProDescriptionsItem',
    props: descriptionsItemProps(),
    slots: Object as SlotsType<DescriptionsItemSlots>,
    setup (_, { slots }) {
        return () => {
            return slots.default && slots.default()
        }
    }
})

DescriptionsItem.install = function (app: App): App {
    app.component(DescriptionsItem.name as string, DescriptionsItem)
    return app
}

export default DescriptionsItem
