import { defineComponent } from 'vue'
import { Form, Number, Text } from '@site-pro/components'

export default defineComponent(() => {
    function onFinish (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Form onFinish={onFinish}>
                <Form.Dependency name={['text', 'number', ['data', 'text']]}>
                    {(values: any) => {
                        return JSON.stringify(values)
                    }}
                </Form.Dependency>
                <Text
                    label={'DataText'}
                    name={['data', 'text']}
                    width={180}
                />
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
            </Form>
        )
    }
})
