import { defineComponent, Fragment } from 'vue'
import { Action } from '@site-pro/components'

export default defineComponent(() => {
    return () => {
        return (
            <Fragment>
                <Action.Group>
                    <Action>操作一</Action>
                    <Action>操作二</Action>
                </Action.Group>
            </Fragment>
        )
    }
})
