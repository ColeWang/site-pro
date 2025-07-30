import { defineComponent, Fragment } from 'vue'
import { QueryFilter, Text, Number } from '@site-pro/components'

export default defineComponent(() => {
    function onValuesChange (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <QueryFilter collapse={false} defaultCollapsed={true} onValuesChange={onValuesChange}>
                    <Text label={'Text'} name={'text'}/>
                    <Number tooltip={'Number'} label={'Number'} name={'number'}/>
                    <Number tooltip={'Number'} label={'Number'} name={'number2'}/>
                    <Number tooltip={'Number'} label={'Number'} name={'number3'}/>
                </QueryFilter>
            </Fragment>
        )
    }
})
