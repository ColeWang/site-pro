import type { ComputedRef, Ref } from 'vue'
import { computed, defineComponent, ref, unref, watch } from 'vue'
import { ConfigProvider, Form, theme } from 'ant-design-vue'
import type { BaseNamePath } from '@site-pro/utils'
import { cloneProxyToRaw, getElement } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { get, head, isFunction, isObject, pick, set, unset, update } from 'lodash-es'
import RowWrap from '../helpers/RowWrap'
import { createFromInstance } from './hooks/useFormInstance'
import type { BaseFormExpose, BaseFormModel, BaseFormProps, Updater } from './typings'
import { antFormProps, baseFormProps } from './typings'
import type { FormInstance, RowProps } from '../../ant-typings'
import useStyle from './style'

function resetLayoutOfGrid (props: BaseFormProps): BaseFormProps['layout'] {
    // 当 grid = true 时 layout 不支持 inline
    const { layout, grid } = props || {}
    return (grid && layout === 'inline') ? 'vertical' : layout
}

export default defineComponent({
    inheritAttrs: false,
    name: 'ProBaseForm',
    props: baseFormProps(),
    emits: ['submit', 'finish', 'finishFailed', 'reset', 'valuesChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const { prefixCls } = useConfigInject('pro-base-form', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

        const popupContainer: Ref<HTMLElement | null> = ref(null)
        const formInstanceRef: Ref<FormInstance | null> = ref(null)

        const defaultValues: BaseFormModel = cloneProxyToRaw(props.initialValues)
        // 考虑到 model 传递就不再需要 initialValues
        const model: Ref<BaseFormModel> = ref(props.model || defaultValues)

        const rowProps: ComputedRef<RowProps> = computed(() => {
            const { sizeMS } = unref(token)
            const baseProps = { gutter: [sizeMS, 0] }
            return { ...baseProps, ...props.rowProps } as RowProps
        })

        const formProps: ComputedRef<BaseFormProps> = computed(() => {
            const layout = resetLayoutOfGrid(props)
            const baseProps = { ...attrs, ...props, layout }
            return { ...baseProps, rowProps: unref(rowProps) } as BaseFormProps
        })

        watch(model, (curr: BaseFormModel) => {
            emit('valuesChange', curr)
        }, { immediate: true, deep: true })

        function setModelValue (namePath: BaseNamePath, value: any): BaseFormModel {
            return set(model.value, namePath, value)
        }

        function getModelValue (namePath: BaseNamePath): any {
            return get(model.value, namePath, undefined)
        }

        function updateModelValue (namePath: BaseNamePath, updater: Updater): BaseFormModel {
            return update(model.value, namePath, updater)
        }

        function deleteModelValue (namePath: BaseNamePath): boolean {
            return unset(model.value, namePath)
        }

        async function validate (names?: BaseNamePath[]): Promise<BaseFormModel> {
            const context = unref(formInstanceRef)
            if (context && context.validate) {
                return context.validate(names)
            }
            /* v8 ignore next 3 */
            const error = new Error('Error: context is not defined')
            return Promise.reject(error)
        }

        function onFinish (values: BaseFormModel): void {
            // 支持 form 的 submit 事件, html-type="submit"
            const nextValues = cloneProxyToRaw(values)
            if (props.transform && isFunction(props.transform)) {
                const resultValues = props.transform(nextValues) || {}
                emit('finish', resultValues)
            } else {
                emit('finish', nextValues)
            }
        }

        function onScrollToField (namePath: BaseNamePath, options: any): void {
            const context = unref(formInstanceRef)
            context && context.scrollToField(namePath, options)
        }

        function onFinishFailed (error: any): void {
            const { scrollToFirstError } = props
            if (scrollToFirstError && error.errorFields.length) {
                const headField: any = head(error.errorFields)
                const options = isObject(scrollToFirstError) ? scrollToFirstError : {}
                onScrollToField(headField.name, options)
            }
            emit('finishFailed', error)
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

        function resetFields (names?: BaseNamePath[]): void {
            const context: FormInstance | null = unref(formInstanceRef)
            context && context.resetFields(names as any)
            emit('reset', unref(model))
            props.submitOnReset && submit()
        }

        function getPopupContainer (): HTMLElement {
            return getElement(popupContainer) || document.body
        }

        const fromExpose: BaseFormExpose = {
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

        createFromInstance(fromExpose)
        expose(fromExpose)

        return () => {
            const { layout, grid, rowProps } = unref(formProps)

            const needFormProps = {
                ...pick(props, Object.keys(antFormProps)),
                layout: layout,
                model: unref(model),
                onFinish: onFinish
            }

            const rowWrapProps = { ...rowProps, grid: grid }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <Form {...needFormProps} ref={formInstanceRef}>
                                <RowWrap {...rowWrapProps} v-slots={slots}/>
                            </Form>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
