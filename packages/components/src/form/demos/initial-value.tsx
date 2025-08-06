import { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import type { BaseFormInstance } from '@site-pro/components/base-form'
import { Form, Number, Text } from '@site-pro/components'
import { Submitter } from '@site-pro/components/base-form'

export default defineComponent(() => {
    const formRef: Ref<BaseFormInstance | null> = ref(null)

    function onFormRef (el: BaseFormInstance | null) {
        formRef.value = el
    }

    function onReset () {
        formRef.value!.resetFields()
    }

    function onSubmit () {
        formRef.value!.validate().then((values) => {
            console.log(values)
        })
    }

    return () => {
        return (
            <Form onFormRef={onFormRef}>
                <Text
                    label={'Text'}
                    name={'text'}
                    initialValue={'默认值'}
                    width={180}
                />
                <Number
                    label={'Number'}
                    name={'number'}
                    initialValue={123}
                    width={180}
                />
                <Submitter onReset={onReset} onSubmit={onSubmit}/>
            </Form>
        )
    }
})
