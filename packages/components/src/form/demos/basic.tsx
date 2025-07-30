import { defineComponent } from 'vue'
import { Form, Number, Text } from '@site-pro/components'
import { Button } from 'ant-design-vue'

export default defineComponent(() => {
    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Form onFinish={onFinish}>
                <Text
                    label={'Text'}
                    name={'text'}
                    width={180}
                />
                <Number
                    label={'Number'}
                    name={'number'}
                    width={180}
                    required={true}
                />
                <Button type={'primary'} html-type={'submit'}>提交</Button>
            </Form>
        )
    }
})
