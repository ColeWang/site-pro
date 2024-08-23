import type { ExtractPropTypes, PropType } from 'vue'
import type {
    CascaderProps,
    CheckboxGroupProps,
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
    TreeSelectProps,
} from 'ant-design-vue'
import type {
    CommonProps,
    DatePickerProps as BaseDatePickerProps,
    RangePickerProps as BaseRangePickerProps
} from 'ant-design-vue/es/date-picker/generatePicker/props'
import type { TextAreaProps as InputTextAreaProps } from 'ant-design-vue/es/input'
import type { Dayjs } from 'dayjs'

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

type DatePickerProps = CommonProps<Dayjs> & BaseDatePickerProps<Dayjs>;
type RangePickerProps = CommonProps<Dayjs> & BaseRangePickerProps<Dayjs>;

export type {
    InputProps,
    InputNumberProps,
    InputPasswordProps,
    InputTextAreaProps,
    DatePickerProps,
    RangePickerProps,
    TimePickerProps,
    TimeRangePickerProps,
    CascaderProps,
    CheckboxGroupProps,
    RadioProps,
    SelectProps,
    SliderProps,
    SwitchProps,
    TreeSelectProps,
    FormItemProps,
    FormProps,
}
