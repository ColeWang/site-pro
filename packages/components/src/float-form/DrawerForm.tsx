import type { App, Ref, SlotsType } from 'vue'
import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Drawer } from 'ant-design-vue'
import type { BaseSlot, DrawerProps, Recordable } from '@site-pro/utils'
import { getSlotVNode } from '@site-pro/utils'
import { omit, pick } from 'lodash-es'
import { useLocaleReceiver } from '../locale-provider'
import useFloatForm from './hooks/useFloatForm'
import type { BaseFormInstance, BaseFormProps, SubmitterProps } from '../base-form'
import { BaseForm, Submitter } from '../base-form'
import type { DrawerFormExpose } from './typings'
import { drawerFormProps } from './typings'

const DrawerForm = defineComponent({
    inheritAttrs: false,
    name: 'ProDrawerForm',
    props: drawerFormProps(),
    slots: Object as SlotsType<{
        default?: any;
        trigger?: any;
    }>,
    emits: ['update:open', 'formRef', 'open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef: Ref<BaseFormInstance | null> = ref(null)

        const { t } = useLocaleReceiver(['Form'])

        const { sOpen, loading, onOpen, onCancel, onFinish } = useFloatForm(props, {
            onOpen: () => emit('open'),
            onCancel: () => emit('cancel'),
            onUpdateOpen: (value) => emit('update:open', value)
        })

        watch(sOpen, (value) => {
            emit('openChange', value)
        })

        watch(loading, (value) => {
            emit('loadingChange', value)
        })

        /* v8 ignore next 3 */
        function onAfterClose (value: boolean): void {
            !value && emit('afterClose')
        }

        function onSubmit (): void {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function onBaseFormRef (el: any): void {
            baseFormRef.value = el
            emit('formRef', el)
        }

        const drawerFormExpose: DrawerFormExpose = {
            open: onOpen,
            close: onCancel
        }
        expose(drawerFormExpose)

        return () => {
            const { extraProps, submitter } = props

            const baseFormProps: BaseFormProps = {
                ...(pick(props, Object.keys(BaseForm.props)) as BaseFormProps),
                onFinish: onFinish
            }

            const needDrawerProps: DrawerProps = {
                ...(pick(props, Object.keys(Drawer.props)) as DrawerProps),
                ...attrs,
                ...extraProps,
                open: unref(sOpen),
                onClose: onCancel,
                onAfterOpenChange: onAfterClose
            }
            const drawerSlots: Recordable<BaseSlot> = {
                extra: () => {
                    const submitterProps: SubmitterProps = {
                        ...(pick(submitter, Object.keys(Submitter.props)) as SubmitterProps),
                        submitText: submitter.submitText || t('okText'),
                        resetText: submitter.resetText || t('cancelText'),
                        loading: unref(loading),
                        onSubmit: onSubmit,
                        onReset: onCancel
                    }
                    return <Submitter {...submitterProps}/>
                }
            }

            const triggerDom = getSlotVNode(slots, props, 'trigger')
            const baseFormSlots = omit(slots, ['trigger'])

            return (
                <Fragment>
                    <Drawer {...needDrawerProps} v-slots={drawerSlots}>
                        <BaseForm {...baseFormProps} ref={onBaseFormRef} v-slots={baseFormSlots}/>
                    </Drawer>
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

DrawerForm.install = function (app: App): App {
    app.component(DrawerForm.name as string, DrawerForm)
    return app
}

export default DrawerForm
