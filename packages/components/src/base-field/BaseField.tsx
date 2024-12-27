import type { App, Plugin, SlotsType, VNode } from 'vue'
import { defineComponent, unref } from 'vue'
import type { BaseSlot, Recordable } from '@site-pro/utils'
import { get, isFunction } from 'lodash-es'
import { useBaseFieldProvider } from './hooks/useBaseFieldProvider'
import type { BaseFieldProps, BaseFieldProviderValueTypeMap, BaseFieldSlots, BaseFieldValueType } from './typings'
import { baseFieldProps } from './typings'
// ---
import {
    FieldCascader,
    FieldCheckbox,
    FieldDatePicker,
    FieldNumber,
    FieldPassword,
    FieldRadio,
    FieldRangePicker,
    FieldSelect,
    FieldSlider,
    FieldSwitch,
    FieldText,
    FieldTextarea,
    FieldTimePicker,
    FieldTimeRangePicker,
    FieldTreeSelect
} from './components'

type BaseFieldFieldProps = BaseFieldProps['fieldProps'] & any;

function mergeFieldProps (
    props: BaseFieldProps,
    fieldProps: BaseFieldFieldProps
): BaseFieldProps {
    return { ...props, fieldProps: { ...props.fieldProps, ...fieldProps } }
}

function defaultRenderText (
    valueType: BaseFieldValueType,
    props: BaseFieldProps,
    slots: Recordable<BaseSlot>
): VNode {
    if (valueType === 'date') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateWeek') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'week',
            format: 'YYYY-wo'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateWeekRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'week',
            format: 'YYYY-wo'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateMonth') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'month',
            format: 'YYYY-MM'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateMonthRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'month',
            format: 'YYYY-MM'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateQuarter') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'quarter',
            format: 'YYYY-[Q]Q'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateQuarterRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'quarter',
            format: 'YYYY-[Q]Q'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateYear') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'year',
            format: 'YYYY'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateYearRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'year',
            format: 'YYYY'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateTime') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: true
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateTimeRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: true
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'time') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            format: 'HH:mm:ss'
        })
        return <FieldTimePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'timeRange') {
        const dateProps: BaseFieldProps = mergeFieldProps(props, {
            format: 'HH:mm:ss'
        })
        return <FieldTimeRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'select') {
        return <FieldSelect {...props} v-slots={slots}/>
    }
    if (valueType === 'treeSelect') {
        return <FieldTreeSelect {...props} v-slots={slots}/>
    }
    if (valueType === 'cascader') {
        return <FieldCascader {...props} v-slots={slots}/>
    }
    if (valueType === 'radio') {
        return <FieldRadio {...props} v-slots={slots}/>
    }
    if (valueType === 'checkbox') {
        return <FieldCheckbox {...props} v-slots={slots}/>
    }
    if (valueType === 'switch') {
        return <FieldSwitch {...props} v-slots={slots}/>
    }
    if (valueType === 'slider') {
        return <FieldSlider {...props} v-slots={slots}/>
    }
    if (valueType === 'text') {
        return <FieldText {...props} v-slots={slots}/>
    }
    if (valueType === 'number') {
        return <FieldNumber {...props} v-slots={slots}/>
    }
    if (valueType === 'textarea') {
        return <FieldTextarea {...props} v-slots={slots}/>
    }
    if (valueType === 'password') {
        return <FieldPassword {...props} v-slots={slots}/>
    }
    return <FieldText {...props} v-slots={slots}/>
}

const BaseField = defineComponent({
    inheritAttrs: false,
    name: 'ProBaseField',
    props: baseFieldProps(),
    slots: Object as SlotsType<BaseFieldSlots>,
    setup (props, { slots }) {
        const { valueTypeMap } = useBaseFieldProvider()

        function onUpdateValue (value: any): void {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { mode, text, valueType, fieldProps, formItemProps } = props
            const placeholder = fieldProps.placeholder || props.placeholder
            const { model, name: namePath } = formItemProps

            const inputValue: any = namePath
                ? get(model || {}, namePath, undefined)
                : undefined

            const needFieldProps: BaseFieldFieldProps = {
                ...fieldProps,
                value: inputValue,
                placeholder: placeholder,
                ['onUpdate:value']: onUpdateValue
            }
            const needBaseFieldProps: BaseFieldProps = {
                ...props,
                text: mode === 'edit' ? (inputValue ?? text) : (text ?? inputValue),
                fieldProps: needFieldProps
            }

            const needTypes: BaseFieldProviderValueTypeMap = unref(valueTypeMap) || {}

            const renderText: BaseSlot | undefined = needTypes[valueType]
            if (renderText && isFunction(renderText)) {
                return renderText({ props: needBaseFieldProps, slots })
            }

            return defaultRenderText(valueType as BaseFieldValueType, needBaseFieldProps, slots)
        }
    }
})

BaseField.install = function (app: App): App {
    app.component(BaseField.name as string, BaseField)
    return app
}

export default BaseField as typeof BaseField & Plugin
