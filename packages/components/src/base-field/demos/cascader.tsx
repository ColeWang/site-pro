import { defineComponent, Fragment } from 'vue'
import { BaseField } from '@site-pro/components'

export default defineComponent(() => {
    const options = [
        {
            value: '1',
            label: '选项1',
            children: [
                { value: '1-1', label: '选项1-1' },
                { value: '1-2', label: '选项1-2' }
            ]
        },
        {
            value: '2',
            label: '选项2',
            children: [
                { value: '2-1', label: '选项2-1' },
                { value: '2-2', label: '选项2-2' }
            ]
        }
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
            <Fragment>
                <BaseField request={request} valueType={'cascader'}/>
                <BaseField mode={'read'} text={['1', '1-1']} request={request} valueType={'cascader'}/>
            </Fragment>
        )
    }
})
