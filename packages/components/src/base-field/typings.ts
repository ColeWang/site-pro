import type { ExtractPropTypes, PropType, VNodeChild } from 'vue'
import type {
    CascaderProps,
    CheckboxGroupProps,
    DatePickerProps,
    FormItemProps,
    FormProps,
    InputNumberProps,
    InputPasswordProps,
    InputProps,
    InputTextAreaProps,
    RadioProps,
    RangePickerProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TimePickerProps,
    TimeRangePickerProps,
    TreeSelectProps
} from '../ant-type'

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
    radio: RadioProps;
    checkbox: CheckboxGroupProps;
    switch: SwitchProps;
    slider: SliderProps;
    number: InputNumberProps;
    textarea: InputTextAreaProps;
    password: InputPasswordProps;
    text: InputProps;
}

export type BaseFieldValueType = Extract<keyof BaseFieldValueTypeWithFieldProps, any>;
export type BaseFieldFenderField = (...args: any[]) => VNodeChild;

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
        type: String as PropType<string>,
        default: undefined
    },
    valueType: {
        type: String as PropType<BaseFieldValueType | string>,
        default: 'text'
    },
    valueEnum: {
        type: Object as PropType<any>,
        default: undefined
    },
    fieldProps: {
        type: Object as PropType<any>,
        default: () => ({})
    },
    formItemProps: {
        type: Object as PropType<FormItemProps & { model?: FormProps['model'] }>,
        default: () => ({})
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    },
    renderField: {
        type: Function as PropType<BaseFieldFenderField>,
        default: undefined
    }
})

export type BaseFieldProps = Partial<ExtractPropTypes<ReturnType<typeof baseFieldProps>>>;

