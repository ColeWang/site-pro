import { defineComponent } from 'vue'

export default defineComponent({
    setup (props, { slots }) {
        console.log(props)
        return () => {
            return slots.default ? slots.default() : null
        }
    }
})
