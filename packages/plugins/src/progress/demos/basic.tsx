import { defineComponent, Fragment } from 'vue'
import { Button } from 'ant-design-vue'
import { Progress } from '@site-pro/plugins'

export default defineComponent(() => {
    function onClick () {
        Progress.start()

        setTimeout(() => {
            Progress.done()
        }, 800)
    }

    return () => {
        return (
            <Fragment>
                <Button onClick={onClick}>Progress</Button>
            </Fragment>
        )
    }
})
