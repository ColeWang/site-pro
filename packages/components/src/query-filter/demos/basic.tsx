import { defineComponent, Fragment } from 'vue'
import { QueryFilter, Text, Number } from '@site-pro/components'

export default defineComponent(() => {
    function onValuesChange (values: any) {
        console.log(values)
    }

    return () => {
        return (
            <Fragment>
                <QueryFilter onValuesChange={onValuesChange}>
                    <Text label={'Text'} name={'text'}/>
                    <Number tooltip={'Number'} label={'Number'} name={'number'}/>
                </QueryFilter>
            </Fragment>
        )
    }
})
