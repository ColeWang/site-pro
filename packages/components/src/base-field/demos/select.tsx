import { defineComponent } from 'vue'
import { BaseField } from '@site-pro/components'

export default defineComponent(() => {
    const options = [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' }
    ]

    function request () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: options })
            }, 1000)
        })
    }

    return () => {
        return (
            <BaseField request={request} fieldProps={{ showSearch: true }} valueType={'select'}/>
        )
    }
})
