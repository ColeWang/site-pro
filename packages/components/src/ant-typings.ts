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
import type {
    ColumnType as TableColumnType,
    FilterValue as TableFilterValue,
    SorterResult as TableSorterResult,
    SortOrder as TableSortOrder,
    TableAction,
    TableCurrentDataSource,
    TablePaginationConfig as TablePagination,
    TableRowSelection
} from 'ant-design-vue/es/table/interface'
import type { CopyConfig as TypographyCopyable } from 'ant-design-vue/es/typography/Base'
import type { MenuProps } from 'ant-design-vue/es/menu'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'
import type { DataNode as TreeDataNode, TreeProps } from 'ant-design-vue/es/tree'
import type { CheckInfo as TreeCheckInfo } from 'ant-design-vue/es/vc-tree/props'
import type { EventDataNode as TreeEventDataNode } from 'ant-design-vue/es/vc-tree/interface'
import type { NodeDragEventParams as TreeNodeDragEventParams } from 'ant-design-vue/es/vc-tree/contextTypes'
import type { MappingAlgorithm as ThemeAlgorithm, ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import type { AliasToken as ThemeToken } from 'ant-design-vue/es/theme/interface/alias'
import type { OverrideToken as ThemeOverrideToken } from 'ant-design-vue/es/theme/interface'
import type { Dayjs } from 'dayjs'

const passwordProps = () => ({
    prefixCls: String,
    inputPrefixCls: String,
    action: { type: String, default: 'click' },
    visibilityToggle: { type: Boolean, default: true },
    visible: { type: Boolean, default: undefined },
    'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
    iconRender: Function,
})

type InputPasswordProps = InputProps & Partial<ExtractPropTypes<ReturnType<typeof passwordProps>>>;

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
    TableColumnType,
    TablePagination,
    TableFilterValue,
    TableSorterResult,
    TableSortOrder,
    TableAction,
    TableRowSelection,
    TableCurrentDataSource,
    // --
    ValidateErrorEntity,
    TypographyCopyable,
    MenuProps,
    MenuInfo,
    TreeProps,
    TreeDataNode,
    TreeCheckInfo,
    TreeEventDataNode,
    TreeNodeDragEventParams,
    // --
    ThemeConfig,
    ThemeToken,
    ThemeAlgorithm,
    ThemeOverrideToken
}
