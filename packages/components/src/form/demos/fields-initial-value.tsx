import { defineComponent } from 'vue'
import { Form, Number, Text } from '@site-pro/components'

export default defineComponent(() => {
    function onValuesChange (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Form onValuesChange={onValuesChange}>
                <Text
                    label={'Text'}
                    name={'text'}
                    initialValue={'123123'}
                    width={180}
                />
                <Number
                    label={'Number'}
                    name={'number'}
                    initialValue={123123}
                />
            </Form>
        )
    }
})
