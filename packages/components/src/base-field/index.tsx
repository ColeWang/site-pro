import { defineComponent, PropType, ExtractPropTypes, ComponentPublicInstance } from 'vue'

function testProps () {
    return {
        schema: {
            type: Object as PropType<{ name: string }>
        }
    }
}

export type TestExpose = {};
export type TestProps = Partial<ExtractPropTypes<ReturnType<typeof testProps>>>;
export type TestInstance = ComponentPublicInstance<TestProps, TestExpose>;

export default defineComponent({
    props: testProps(),
    setup (props, { slots }) {
        console.log(props.schema?.name)
        return () => {
            return slots.default ? slots.default() : null
        }
    }
})
