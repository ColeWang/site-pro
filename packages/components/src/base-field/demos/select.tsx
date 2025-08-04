import { defineComponent } from 'vue'
import { BaseField } from '@site-pro/components'

export default defineComponent(() => {
    function request () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [{ value: 'test', label: 'test' }] })
            }, 1000)
        })
    }

    return () => {
        return (
            <BaseField request={request} fieldProps={{ showSearch: true }} valueType={'select'}/>
        )
    }
})
