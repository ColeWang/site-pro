import { defineComponent, Fragment } from 'vue'
import { Screen } from '@site-pro/plugins'

export default defineComponent(() => {
    return () => {
        return (
            <Fragment>
                <div>{JSON.stringify(Screen)}</div>
            </Fragment>
        )
    }
})
