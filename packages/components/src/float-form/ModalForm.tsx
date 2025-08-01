import type { App, Plugin, Ref, SlotsType, VNodeChild } from 'vue'
import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Modal as AntModal } from 'ant-design-vue'
import { omit, pick } from 'lodash-es'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { useLocaleReceiver } from '../locale-provider'
import useFloatForm from './hooks/useFloatForm'
import type { BaseFormInstance, BaseFormProps, SubmitterProps } from '../base-form'
import { BaseForm, Submitter } from '../base-form'
import type { ModalProps } from '../ant-typings'
import type { ModalFormExpose, ModalFormSlots } from './typings'
import { modalFormProps } from './typings'

const ModalForm = defineComponent({
    inheritAttrs: false,
    name: 'ProModalForm',
    props: modalFormProps(),
    slots: Object as SlotsType<ModalFormSlots>,
    emits: ['update:open', 'formRef', 'open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef: Ref<BaseFormInstance | null> = ref(null)

        const { t } = useLocaleReceiver(['Form'])

        const { sOpen, loading, onOpen, onCancel, onFinish } = useFloatForm(props, {
            onOpen: () => emit('open'),
            onCancel: () => emit('cancel'),
            onUpdateOpen: (value: boolean) => emit('update:open', value)
        })

        watch(sOpen, (value) => {
            emit('openChange', value)
        })

        watch(loading, (value) => {
            emit('loadingChange', value)
        })

        /* v8 ignore next 3 */
        function onAfterClose (): void {
            emit('afterClose')
        }

        function onSubmit (): void {
            const context: BaseFormInstance | null = unref(baseFormRef)
            context && context.submit()
        }

        function onBaseFormRef (el: any): void {
            baseFormRef.value = el
            emit('formRef', el)
        }

        const modalFormExpose: ModalFormExpose = {
            open: onOpen,
            close: onCancel
        }
        expose(modalFormExpose)

        return () => {
            const { extraProps, submitter } = props

            const baseFormProps: BaseFormProps = {
                ...pick(props, Object.keys(BaseForm.props)) as BaseFormProps,
                onFinish: onFinish
            }

            const needModalProps: ModalProps = {
                ...pick(props, Object.keys(AntModal.props)) as ModalProps,
                ...extraProps,
                ...attrs,
                open: unref(sOpen),
                onCancel: onCancel,
                afterClose: onAfterClose
                // onAfterClose: onAfterClose
            }
            const modalSlots: Recordable<BaseSlot> = {
                footer: () => {
                    const submitterProps: SubmitterProps = {
                        ...pick(submitter, Object.keys(Submitter.props)) as SubmitterProps,
                        submitText: submitter.submitText || t('okText'),
                        resetText: submitter.resetText || t('cancelText'),
                        loading: unref(loading),
                        onSubmit: onSubmit,
                        onReset: onCancel
                    }
                    return <Submitter {...submitterProps}/>
                }
            }

            const triggerDom: VNodeChild = getSlotVNode(slots, props, 'trigger')
            const baseFormSlots: Recordable<BaseSlot> = omit(slots, ['trigger'])

            return (
                <Fragment>
                    <AntModal {...needModalProps} v-slots={modalSlots}>
                        <BaseForm {...baseFormProps} ref={onBaseFormRef} v-slots={baseFormSlots}/>
                    </AntModal>
                    {triggerDom && (
                        <div style={{ display: 'inline-block' }} onClick={onOpen}>
                            {triggerDom}
                        </div>
                    )}
                </Fragment>
            )
        }
    }
})

ModalForm.install = function (app: App): App {
    app.component(ModalForm.name as string, ModalForm)
    return app
}

export default ModalForm as typeof ModalForm & Plugin
