import type { App, ComputedRef, Plugin, Ref, SlotsType } from 'vue'
import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ConfigProvider as AntConfigProvider, Form as AntForm, theme as antTheme } from 'ant-design-vue'
import type { NamePath, Recordable } from '@site-pro/utils'
import { cloneProxyToRaw, getElement } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { get, head, isFunction, isObject, pick, set, unset, update } from 'lodash-es'
import { createFromInstance } from './hooks/useFormInstance'
import type { RowWrapperProps } from './helpers'
import { RowWrapper } from './helpers'
import type { FormInstance, FormProps, FormValidateError, RowProps } from '../ant-typings'
import type { BaseFormExpose, BaseFormLayout, BaseFormProps, BaseFormSlots, BaseFormUpdater } from './typings'
import { baseFormProps } from './typings'
import useStyle from './style'

const BaseForm = defineComponent({
    inheritAttrs: false,
    name: 'ProBaseForm',
    props: baseFormProps(),
    slots: Object as SlotsType<BaseFormSlots>,
    emits: ['submit', 'finish', 'finishFailed', 'reset', 'valuesChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-base-form', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = antTheme.useToken()

        const popupContainer: Ref<HTMLElement | null> = ref(null)
        const formInstanceRef: Ref<FormInstance | null> = ref(null)

        const defaultValues: Recordable = cloneProxyToRaw(props.initialValues)
        // 考虑到 model 传递就不再需要 initialValues
        const model: Ref<Recordable> = ref(props.model || defaultValues)

        const formProps: ComputedRef<BaseFormProps> = computed(() => {
            const { sizeMS } = unref(token)

            const rowProps: RowProps = Object.assign({
                gutter: [sizeMS, 0]
            }, props.rowProps)

            const layout: BaseFormLayout = (props.grid && props.layout === 'inline')
                ? 'vertical'
                : props.layout

            return { ...props, ...attrs, layout, rowProps } as BaseFormProps
        })

        watch(model, (curr: Recordable) => {
            emit('valuesChange', curr)
        }, { immediate: true, deep: true })

        function setModelValue (namePath: NamePath, value: any): Recordable {
            return set(model.value, namePath, value)
        }

        function getModelValue (namePath: NamePath): any {
            return get(model.value, namePath, undefined)
        }

        function updateModelValue (namePath: NamePath, updater: BaseFormUpdater): Recordable {
            return update(model.value, namePath, updater)
        }

        function deleteModelValue (namePath: NamePath): boolean {
            return unset(model.value, namePath)
        }

        async function validate (names?: NamePath[]): Promise<Recordable> {
            const context: FormInstance | null = unref(formInstanceRef)
            if (context && context.validate) {
                return context.validate(names)
            }
            /* v8 ignore next 3 */
            const error: Error = new Error('Error: context is not defined')
            return Promise.reject(error)
        }

        function onFinish (values: Recordable): void {
            // 支持 form 的 submit 事件, html-type="submit"
            const nextValues: Recordable = cloneProxyToRaw(values)
            if (props.transform && isFunction(props.transform)) {
                const resultValues: Recordable = props.transform(nextValues) || {}
                emit('finish', resultValues)
            } else {
                emit('finish', nextValues)
            }
        }

        function onScrollToField (namePath: NamePath, options: any): void {
            const context: FormInstance | null = unref(formInstanceRef)
            context && context.scrollToField(namePath, options)
        }

        function onFinishFailed (errorInfo: FormValidateError): void {
            const { scrollToFirstError } = props
            if (scrollToFirstError && errorInfo.errorFields.length) {
                const headField: any = head(errorInfo.errorFields)
                const options: any = isObject(scrollToFirstError) ? scrollToFirstError : {}
                onScrollToField(headField.name, options)
            }
            emit('finishFailed', errorInfo)
        }

        function submit (): void {
            emit('submit', { __MARK__: 'submit' })
            validate().then((values) => {
                onFinish(values)
            }, (error) => {
                console.warn('Validate Failed:', error)
                onFinishFailed(error)
            })
        }

        function resetFields (names?: NamePath[]): void {
            const context: FormInstance | null = unref(formInstanceRef)
            context && context.resetFields(names as any)
            emit('reset', unref(model))
            props.submitOnReset && submit()
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        const baseFromExpose: BaseFormExpose = {
            formInstanceRef,
            model,
            formProps,
            setModelValue,
            getModelValue,
            updateModelValue,
            deleteModelValue,
            submit,
            validate,
            resetFields
        }

        createFromInstance(baseFromExpose)
        expose(baseFromExpose)

        return () => {
            const { layout, grid, rowProps } = unref(formProps)

            const needFormProps: FormProps = {
                ...pick(props, Object.keys(AntForm.props)) as FormProps,
                layout: layout,
                model: unref(model),
                onFinish: onFinish
            }

            const rowWrapperProps: RowWrapperProps = { ...rowProps, grid: grid }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <AntConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <AntForm {...needFormProps} ref={formInstanceRef}>
                                <RowWrapper {...rowWrapperProps} v-slots={slots}/>
                            </AntForm>
                        </div>
                    </AntConfigProvider>
                </div>
            )
        }
    }
})

BaseForm.install = function (app: App): App {
    app.component(BaseForm.name as string, BaseForm)
    return app
}

export default BaseForm as typeof BaseForm & Plugin
