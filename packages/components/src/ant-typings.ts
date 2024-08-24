import type { ExtractPropTypes, PropType } from 'vue'
import type {
    CascaderProps,
    CheckboxGroupProps,
    FormInstance,
    FormItemProps,
    FormProps,
    InputNumberProps,
    InputProps,
    RadioGroupProps,
    RowProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TreeSelectProps
} from 'ant-design-vue'
import type {
    CommonProps,
    DatePickerProps as AntDatePickerProps,
    RangePickerProps as AntRangePickerProps
} from 'ant-design-vue/es/date-picker/generatePicker/props'
import type {
    TimePickerProps as AntTimePickerProps,
    TimeRangePickerProps as AntTimeRangePickerProps
} from 'ant-design-vue/es/time-picker/time-picker'
import type { TextAreaProps as InputTextareaProps } from 'ant-design-vue/es/input'
import type { Dayjs } from 'dayjs'
// -- props --
import { formItemProps, formProps } from 'ant-design-vue/es/form'

const passwordProps = {
    prefixCls: String,
    inputPrefixCls: String,
    action: { type: String, default: 'click' },
    visibilityToggle: { type: Boolean, default: true },
    visible: { type: Boolean, default: undefined },
    'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
    iconRender: Function,
}

type InputPasswordProps = InputProps & Partial<ExtractPropTypes<typeof passwordProps>>

type DatePickerProps = CommonProps<Dayjs> & AntDatePickerProps<Dayjs>;
type RangePickerProps = CommonProps<Dayjs> & AntRangePickerProps<Dayjs>;
type TimePickerProps = AntTimePickerProps<Dayjs>;
type TimeRangePickerProps = AntTimeRangePickerProps<Dayjs>;

export type {
    InputProps,
    InputNumberProps,
    InputPasswordProps,
    InputTextareaProps,
    DatePickerProps,
    RangePickerProps,
    TimePickerProps,
    TimeRangePickerProps,
    CascaderProps,
    CheckboxGroupProps,
    RadioGroupProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TreeSelectProps,
    // --
    FormProps,
    FormInstance,
    FormItemProps,
    RowProps
}

export { formProps, formItemProps }
