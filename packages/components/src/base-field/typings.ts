import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot, LiteralUnion, Recordable } from '@site-pro/utils'
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

export interface BaseFieldBadge extends Recordable {
    text?: any;
    value?: string | number;
    status?: 'error' | 'default' | 'success' | 'processing' | 'warning';
    color?: LiteralUnion<'blue' | 'cyan' | 'gold' | 'green' | 'lime' | 'magenta' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow' | 'volcano' | 'geekblue'>;
    disabled?: boolean;
}

export interface BaseFieldRequest<T = any> {
    (params?: T): Promise<any>;
}

export interface BaseFieldOption extends Recordable {
    label?: any;
    value?: string | number;
    disabled?: boolean;
    children?: BaseFieldOption[];
}

export interface BaseFieldValueEnum {
    [key: string]: string | number | BaseFieldBadge;
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
    select: SelectProps & { fetchDataOnSearch?: boolean };
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

const innerBaseFieldProps = () => ({
    placeholder: {
        type: [String, Array] as PropType<string | string[]>,
        default: undefined
    },
    emptyText: {
        type: String as PropType<string>,
        default: '-'
    }
})

export const baseFieldProps = () => ({
    ...innerBaseFieldProps(),
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
    request: {
        type: Function as PropType<BaseFieldRequest>,
        default: undefined
    },
    // options: {
    //     type: Array as PropType<BaseFieldOption[]>,
    //     default: undefined
    // },
    valueEnum: {
        type: Object as PropType<BaseFieldValueEnum>,
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
