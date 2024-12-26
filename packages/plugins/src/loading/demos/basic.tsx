import { defineComponent, Fragment } from 'vue'
import { Button } from 'ant-design-vue'
import { Loading } from '@site-pro/plugins'

export default defineComponent(() => {
    function onClick () {
        Loading.show()

        setTimeout(() => {
            Loading.hide()
        }, 2000)
    }

    return () => {
        return (
            <Fragment>
                <Button onClick={onClick}>Loading</Button>
            </Fragment>
        )
    }
})
