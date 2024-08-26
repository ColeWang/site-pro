import type { ComponentPublicInstance, ExtractPropTypes, PropType, VNodeChild } from 'vue'
import type { BaseEnumType, BaseSlot } from '@site-pro/utils'
import type {
    CascaderProps,
    CheckboxGroupProps,
    DatePickerProps,
    FormItemProps,
    FormProps,
    InputNumberProps,
    InputPasswordProps,
    InputProps,
    InputTextareaProps,
    RadioGroupProps,
    RangePickerProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TimePickerProps,
    TimeRangePickerProps,
    TreeSelectProps
} from '../ant-typings'

export interface BaseFieldValueTypeWithFieldProps {
    date: DatePickerProps;
    dateRange: RangePickerProps;
    dateWeek: DatePickerProps;
    dateWeekRange: RangePickerProps;
    dateMonth: DatePickerProps;
    dateMonthRange: RangePickerProps;
    dateQuarter: DatePickerProps;
    dateQuarterRange: RangePickerProps;
    dateYear: DatePickerProps;
    dateYearRange: RangePickerProps;
    dateTime: DatePickerProps;
    dateTimeRange: RangePickerProps;
    time: TimePickerProps;
    timeRange: TimeRangePickerProps;
    select: SelectProps;
    treeSelect: TreeSelectProps;
    cascader: CascaderProps;
    radio: RadioGroupProps;
    checkbox: CheckboxGroupProps;
    switch: SwitchProps;
    slider: SliderProps;
    number: InputNumberProps;
    textarea: InputTextareaProps;
    password: InputPasswordProps;
    text: InputProps;
}

export type BaseFieldValueType = Extract<keyof BaseFieldValueTypeWithFieldProps, any>;
export type BaseFieldFieldProps<T extends BaseFieldValueType> = BaseFieldValueTypeWithFieldProps[T];
export type BaseFieldFormItemProps = FormItemProps & { model?: FormProps['model'] };

export const baseFieldProps = () => ({
    text: {
        type: [String, Number, Array, Object] as PropType<any>,
        default: undefined
    },
    mode: {
        type: String as PropType<'edit' | 'read'>,
        default: 'edit'
    },
    placeholder: {
        type: [String, Array] as PropType<string | string[]>,
        default: undefined
    },
    valueType: {
        type: String as PropType<BaseFieldValueType | string>,
        default: 'text'
    },
    valueEnum: {
        type: Object as PropType<BaseEnumType>,
        default: undefined
    },
    fieldProps: {
        type: Object as PropType<any>,
        default: () => ({})
    },
    formItemProps: {
        type: Object as PropType<BaseFieldFormItemProps>,
        default: () => ({})
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    },
    renderField: {
        type: Function as PropType<BaseSlot<{
            text: any;
            props: any;
            slots: BaseSlot;
            dom: VNodeChild | JSX.Element;
        }>>,
        default: undefined
    }
})

export type BaseFieldProps = Partial<ExtractPropTypes<ReturnType<typeof baseFieldProps>>>;
export type BaseFieldInstance = ComponentPublicInstance<BaseFieldProps>;
