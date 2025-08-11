import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        source: {
            type: String,
            default: undefined
        },
        description: {
            type: String,
            default: undefined
        }
    },
    setup (props, { slots }) {
        // console.log(decodeURIComponent(props.source))
        return () => {
            return (
                <div>
                    <div v-html={decodeURIComponent(props.description)}></div>
                    <div>{slots.source && slots.source()}</div>
                </div>
            )
        }
    }
})
