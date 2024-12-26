import { defineComponent, Fragment } from 'vue'
import { Button } from 'ant-design-vue'
import { ModalForm, Text, Number } from '@site-pro/components'

export default defineComponent(() => {
    function onValuesChange (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <ModalForm onValuesChange={onValuesChange} v-slots={{
                    trigger: () => <Button>Open</Button>
                }}>
                    <Text label={'Text'} name={'text'} width={180}/>
                    <Number tooltip={'Number'} label={'Number'} name={'number'}/>
                </ModalForm>
            </Fragment>
        )
    }
})
