import type { App, ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Button, Space, theme } from 'ant-design-vue'
import type { ButtonProps } from '@site-pro/utils'
import { preventDefault } from '@site-pro/utils'
import { useLocaleReceiver } from '../../locale-provider'

export const submitterProps = () => ({
    size: {
        type: Number as PropType<number>,
        default: undefined
    },
    loading: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    submitText: {
        type: String as PropType<string>,
        default: undefined
    },
    resetText: {
        type: String as PropType<string>,
        default: undefined
    },
    submitButtonProps: {
        type: [Boolean, Object] as PropType<false | ButtonProps>,
        default: undefined
    },
    resetButtonProps: {
        type: [Boolean, Object] as PropType<false | ButtonProps>,
        default: undefined
    },
    onReset: {
        type: Function as PropType<(evt: Event) => void>,
        default: undefined
    },
    onSubmit: {
        type: Function as PropType<(evt: Event) => void>,
        default: undefined
    }
})

export type SubmitterProps = Partial<ExtractPropTypes<ReturnType<typeof submitterProps>>>;
export type SubmitterInstance = ComponentPublicInstance<SubmitterProps>;

const Submitter = defineComponent({
    inheritAttrs: false,
    name: 'ProSubmitter',
    props: submitterProps(),
    emits: ['reset', 'submit'],
    setup (props, { emit, attrs }) {
        const { token } = theme.useToken()

        const { t } = useLocaleReceiver(['Form'])

        function onReset (evt: Event): void {
            preventDefault(evt)
            emit('reset', evt)
        }

        function onSubmit (evt: Event): void {
            preventDefault(evt)
            emit('submit', evt)
        }

        return () => {
            const { size: propsSize, loading, submitText, resetText, submitButtonProps, resetButtonProps } = props
            const { sizeMS } = unref(token)

            const needSubmitButtonProps: ButtonProps = {
                ...submitButtonProps,
                type: 'primary',
                loading: loading,
                onClick: onSubmit
            }

            return (
                <Space size={propsSize || sizeMS / 2} {...attrs}>
                    {resetButtonProps !== false && (
                        <Button {...resetButtonProps} onClick={onReset}>
                            {resetText || t('reset')}
                        </Button>
                    )}
                    {submitButtonProps !== false && (
                        <Button {...needSubmitButtonProps} html-type={'submit'}>
                            {submitText || t('submit')}
                        </Button>
                    )}
                </Space>
            )
        }
    }
})

Submitter.install = function (app: App): App {
    app.component(Submitter.name as string, Submitter)
    return app
}

export default Submitter
