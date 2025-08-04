import { defineComponent, Fragment } from 'vue'
import { BaseField } from '@site-pro/components'

export default defineComponent(() => {
    return () => {
        return (
            <Fragment>
                <BaseField valueType={'number'}/>
                <BaseField valueType={'select'}/>
            </Fragment>
        )
    }
})
