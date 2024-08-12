import { defineComponent } from 'vue'
import { baseFieldProps } from './typings'

export default defineComponent({
    props: baseFieldProps,
    setup () {
        return () => {
            return (
                <div>111</div>
            )
        }
    }
})
