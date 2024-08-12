import type { ExtractPropTypes, PropType } from 'vue'
import type {
    CascaderProps,
    CheckboxProps,
    DatePickerProps,
    FormItemProps,
    FormProps,
    InputNumberProps,
    InputProps,
    RadioProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TimePickerProps,
    TimeRangePickerProps,
    TreeSelectProps
} from 'ant-design-vue'
import type { RangePickerProps } from 'ant-design-vue/es/date-picker'
import type { TextAreaProps } from 'ant-design-vue/es/input'
import passwordProps from 'ant-design-vue/es/input/Password'

export type PasswordProps = Partial<ExtractPropTypes<typeof passwordProps>>;

export interface BaseValueTypeWithFieldProps {
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
    checkbox: CheckboxProps;
    switch: SwitchProps;
    slider: SliderProps;
    number: InputNumberProps;
    textarea: TextAreaProps;
    password: PasswordProps;
    text: InputProps;
}

export type BaseValueType = Extract<keyof BaseValueTypeWithFieldProps, any>;

export const baseFieldProps = {
    text: {
        type: [String, Number, Boolean, Array, Object] as PropType<any>,
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
        type: String as PropType<BaseValueType | string>,
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
        type: Function as PropType<any>,
        default: undefined
    }
}

export type BaseFieldProps = Partial<ExtractPropTypes<typeof baseFieldProps>>;

