import { defineComponent, Fragment } from 'vue'
import { Form, Number, Text } from '@site-pro/components'

export default defineComponent(() => {
    function onValuesChange (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <Form onValuesChange={onValuesChange}>
                    <Text label={'Text'} name={'text'} width={180}/>
                    <Number tooltip={'Number'} label={'Number'} name={'number'}/>
                </Form>
            </Fragment>
        )
    }
})
