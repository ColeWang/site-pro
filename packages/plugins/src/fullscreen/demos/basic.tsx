import { defineComponent, Fragment } from 'vue'
import { Button } from 'ant-design-vue'
import { Fullscreen } from '@site-pro/plugins'

export default defineComponent(() => {
    function onClick () {
        Fullscreen.toggle()
    }

    return () => {
        return (
            <Fragment>
                <Button onClick={onClick}>全屏/关闭</Button>
            </Fragment>
        )
    }
})
