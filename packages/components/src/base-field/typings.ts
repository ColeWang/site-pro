import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType } from 'vue'
import type {
    BaseEnumType,
    BaseSlot,
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
    Recordable,
    SelectProps,
    SliderProps,
    SwitchProps,
    TimePickerProps,
    TimeRangePickerProps,
    TreeSelectProps
} from '@site-pro/utils'

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
    text: InputProps;
    number: InputNumberProps;
    textarea: InputTextareaProps;
    password: InputPasswordProps;
}

export type BaseFieldValueType = keyof BaseFieldValueTypeWithFieldProps;
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
        type: Function as PropType<BaseSlot>,
        default: undefined
    }
})

export interface BaseFieldSlots extends Recordable {
    renderField?: any;
}

export type BaseFieldProps = Partial<ExtractPropTypes<ReturnType<typeof baseFieldProps>>>;
export type BaseFieldInstance = ComponentPublicInstance<BaseFieldProps>;

// BaseFieldProvider
export interface BaseFieldProviderValueTypeMap {
    [key: string]: BaseSlot;
}

export const baseFieldProviderProps = () => ({
    valueTypeMap: {
        type: Object as PropType<BaseFieldProviderValueTypeMap>,
        default: () => ({})
    }
})

export interface BaseFieldProviderSlots {
    default?: any;
}

export type BaseFieldProviderProps = Partial<ExtractPropTypes<ReturnType<typeof baseFieldProviderProps>>>;

export interface BaseFieldProviderExpose {
    valueTypeMap: ComputedRef<BaseFieldProviderValueTypeMap>;
}

export type BaseFieldProviderInstance = ComponentPublicInstance<BaseFieldProviderProps, BaseFieldProviderExpose>;
