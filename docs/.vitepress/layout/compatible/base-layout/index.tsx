import { defineComponent } from 'vue'
import { useData } from 'vitepress'
import { } from '@site-pro/components'

export default defineComponent({
    setup () {
        const { frontmatter } = useData()

        console.log(frontmatter.value)

        return () => {
            return (
                <div>123</div>
            )
        }
    }
})
