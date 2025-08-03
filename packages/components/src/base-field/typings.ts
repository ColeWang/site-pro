import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType } from 'vue'
import type { BaseEnumType, BaseOptionType, BaseSlot, Recordable } from '@site-pro/utils'
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

export interface BaseFieldRequest<T = any> {
    (params?: T): Promise<BaseOptionType[]>;
}

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
        type: [String, Number, Boolean, Array, Object, Function] as PropType<any>,
        default: undefined
    },
    mode: {
        type: String as PropType<'edit' | 'read'>,
        default: 'edit'
    },
    valueType: {
        type: String as PropType<BaseFieldValueType | string>,
        default: 'text'
    },
    placeholder: {
        type: [String, Array] as PropType<string | string[]>,
        default: undefined
    },
    request: {
        type: Function as PropType<BaseFieldRequest>,
        default: undefined
    },
    valueEnum: {
        type: Object as PropType<BaseEnumType>,
        default: undefined
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    },
    fieldProps: {
        type: Object as PropType<any>,
        default: () => ({})
    },
    formItemProps: {
        type: Object as PropType<BaseFieldFormItemProps>,
        default: () => ({})
    },
    renderRead: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    },
    renderEdit: {
        type: Function as PropType<BaseSlot>,
        default: undefined
    }
})

export interface BaseFieldSlots extends Recordable {
    renderRead?: any;
    renderEdit?: any;
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
