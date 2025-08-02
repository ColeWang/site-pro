import { defineComponent, Fragment } from 'vue'
import { Action } from '@site-pro/components'

export default defineComponent(() => {
    return () => {
        return (
            <Fragment>
                <Action.Group max={2}>
                    <Action>操作一</Action>
                    <Action>操作二</Action>
                    <Action>操作三</Action>
                    <Action>操作四</Action>
                </Action.Group>
            </Fragment>
        )
    }
})
