import type { ExtractPropTypes, PropType } from 'vue'
import type { InputProps } from 'ant-design-vue/es/input/inputProps'
import type { InputNumberProps } from 'ant-design-vue/es/input-number'
import type { CascaderProps } from 'ant-design-vue/es/cascader'
import type { CheckboxGroupProps } from 'ant-design-vue/es/checkbox/interface'
import type { RadioGroupProps } from 'ant-design-vue/es/radio/Group'
import type { SelectProps } from 'ant-design-vue/es/select'
import type { SliderProps } from 'ant-design-vue/es/slider'
import type { SwitchProps } from 'ant-design-vue/es/switch'
import type { TreeSelectProps } from 'ant-design-vue/es/tree-select'
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
// ----
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import type { ColProps } from 'ant-design-vue/es/grid/Col'
import type { RowProps } from 'ant-design-vue/es/grid/Row'
import type { FormInstance, FormProps } from 'ant-design-vue/es/form/Form'
import type { FormItemProps } from 'ant-design-vue/es/form/FormItem'
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import type { ModalProps } from 'ant-design-vue/es/modal/Modal'
import type { DrawerProps } from 'ant-design-vue/es/drawer'
import type { TableProps } from 'ant-design-vue/es/table/Table'
import type { ColumnsType, TablePaginationConfig, TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { Dayjs } from 'dayjs'

declare module 'vue-types' {
    // FIX: TS2742 cannot be named without a reference to `xxx`
}

declare module 'scroll-into-view-if-needed' {
    // FIX: TS2742 cannot be named without a reference to `xxx`
}

declare module 'ant-design-vue/es/theme/interface' {
    interface ComponentTokenMap {
        ProFieldTextarea?: {};
        ProBaseForm?: {};
        ProDescriptions?: {};
        ProCollapseTransition?: {};
    }
}

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
    ButtonProps,
    FormProps,
    FormInstance,
    FormItemProps,
    RowProps,
    ColProps,
    ModalProps,
    DrawerProps,
    TableProps,
    ColumnsType,
    TablePaginationConfig,
    TableRowSelection,
    // --
    ValidateErrorEntity
}
