export type { ActionProps, ActionInstance } from './action'
export { Action } from './action'
export type { ActionGroupProps, ActionGroupInstance } from './action'
export { ActionGroup } from './action'

export type { BaseFieldProps, BaseFieldInstance } from './base-field'
export { BaseField } from './base-field'
export type { BaseFieldProviderProps, BaseFieldProviderInstance } from './base-field'
export { BaseFieldProvider } from './base-field'

export type { BaseFormProps, BaseFormInstance } from './base-form'
export { BaseForm } from './base-form'

export type { ConfigProviderProps, ConfigProviderInstance } from './config-provider'
export { ConfigProvider } from './config-provider'

export type { DescriptionsProps, DescriptionsInstance } from './descriptions'
export { Descriptions } from './descriptions'
export type { DescriptionsItemProps, DescriptionsItemInstance } from './descriptions'
export { DescriptionsItem } from './descriptions'

export type { ModalFormProps, ModalFormInstance } from './float-form'
export { ModalForm } from './float-form'
export type { DrawerFormProps, DrawerFormInstance } from './float-form'
export { DrawerForm } from './float-form'

export type { FormProps, FormInstance } from './form'
export { Form } from './form'
export type { FormItemProps, FormItemInstance } from './form'
export { FormItem } from './form'
export type { FormGroupProps, FormGroupInstance } from './form'
export { FormGroup } from './form'
export type { FormDependencyProps, FormDependencyInstance } from './form'
export { FormDependency } from './form'
export type { FieldProps, FieldInstance } from './form'
export { Field } from './form'
export type { UserFieldProps, UserFieldInstance } from './form'
export { UserField } from './form'

export type { LocaleProviderProps, LocaleProviderInstance } from './locale-provider'
export { LocaleProvider } from './locale-provider'

export type { QueryFilterProps, QueryFilterInstance } from './query-filter'
export { QueryFilter } from './query-filter'

export type { ResizeObserverProps, ResizeObserverInstance } from './resize-observer'
export { ResizeObserver } from './resize-observer'

export type { TableProps, TableInstance } from './table'
export { Table } from './table'

export type { DateProps, DateInstance } from './form'
export { Date } from './form'
export type { DateRangeProps, DateRangeInstance } from './form'
export { DateRange } from './form'
export type { DateWeekProps, DateWeekInstance } from './form'
export { DateWeek } from './form'
export type { DateWeekRangeProps, DateWeekRangeInstance } from './form'
export { DateWeekRange } from './form'
export type { DateMonthProps, DateMonthInstance } from './form'
export { DateMonth } from './form'
export type { DateMonthRangeProps, DateMonthRangeInstance } from './form'
export { DateMonthRange } from './form'
export type { DateQuarterProps, DateQuarterInstance } from './form'
export { DateQuarter } from './form'
export type { DateQuarterRangeProps, DateQuarterRangeInstance } from './form'
export { DateQuarterRange } from './form'
export type { DateYearProps, DateYearInstance } from './form'
export { DateYear } from './form'
export type { DateYearRangeProps, DateYearRangeInstance } from './form'
export { DateYearRange } from './form'
export type { DateTimeProps, DateTimeInstance } from './form'
export { DateTime } from './form'
export type { DateTimeRangeProps, DateTimeRangeInstance } from './form'
export { DateTimeRange } from './form'
export type { TimeProps, TimeInstance } from './form'
export { Time } from './form'
export type { TimeRangeProps, TimeRangeInstance } from './form'
export { TimeRange } from './form'
export type { SelectProps, SelectInstance } from './form'
export { Select } from './form'
export type { TreeSelectProps, TreeSelectInstance } from './form'
export { TreeSelect } from './form'
export type { CascaderProps, CascaderInstance } from './form'
export { Cascader } from './form'
export type { RadioProps, RadioInstance } from './form'
export { Radio } from './form'
export type { CheckboxProps, CheckboxInstance } from './form'
export { Checkbox } from './form'
export type { SwitchProps, SwitchInstance } from './form'
export { Switch } from './form'
export type { SliderProps, SliderInstance } from './form'
export { Slider } from './form'
export type { TextProps, TextInstance } from './form'
export { Text } from './form'
export type { NumberProps, NumberInstance } from './form'
export { Number } from './form'
export type { TextareaProps, TextareaInstance } from './form'
export { Textarea } from './form'
export type { PasswordProps, PasswordInstance } from './form'
export { Password } from './form'

declare module 'vue' {
    export interface GlobalComponents {
        ProAction: typeof import('./action')['Action'];
        ProActionGroup: typeof import('./action')['ActionGroup'];
        ProBaseField: typeof import('./base-field')['BaseField'];
        ProBaseFieldProvider: typeof import('./base-field')['BaseFieldProvider'];
        ProBaseForm: typeof import('./base-form')['BaseForm'];
        ProConfigProvider: typeof import('./config-provider')['ConfigProvider'];
        ProDescriptions: typeof import('./descriptions')['Descriptions'];
        ProDescriptionsItem: typeof import('./descriptions')['DescriptionsItem'];
        ProModalForm: typeof import('./float-form')['ModalForm'];
        ProDrawerForm: typeof import('./float-form')['DrawerForm'];
        ProForm: typeof import('./form')['Form'];
        ProFormItem: typeof import('./form')['FormItem'];
        ProFormGroup: typeof import('./form')['FormGroup'];
        ProFormDependency: typeof import('./form')['FormDependency'];
        ProField: typeof import('./form')['Field'];
        ProUserField: typeof import('./form')['UserField'];
        ProLocaleProvider: typeof import('./locale-provider')['LocaleProvider'];
        ProQueryFilter: typeof import('./query-filter')['QueryFilter'];
        ProResizeObserver: typeof import('./resize-observer')['ResizeObserver'];
        ProTable: typeof import('./table')['Table'];
        ProDate: typeof import('./form')['Date'];
        ProDateRange: typeof import('./form')['DateRange'];
        ProDateWeek: typeof import('./form')['DateWeek'];
        ProDateWeekRange: typeof import('./form')['DateWeekRange'];
        ProDateMonth: typeof import('./form')['DateMonth'];
        ProDateMonthRange: typeof import('./form')['DateMonthRange'];
        ProDateQuarter: typeof import('./form')['DateQuarter'];
        ProDateQuarterRange: typeof import('./form')['DateQuarterRange'];
        ProDateYear: typeof import('./form')['DateYear'];
        ProDateYearRange: typeof import('./form')['DateYearRange'];
        ProDateTime: typeof import('./form')['DateTime'];
        ProDateTimeRange: typeof import('./form')['DateTimeRange'];
        ProTime: typeof import('./form')['Time'];
        ProTimeRange: typeof import('./form')['TimeRange'];
        ProSelect: typeof import('./form')['Select'];
        ProTreeSelect: typeof import('./form')['TreeSelect'];
        ProCascader: typeof import('./form')['Cascader'];
        ProRadio: typeof import('./form')['Radio'];
        ProCheckbox: typeof import('./form')['Checkbox'];
        ProSwitch: typeof import('./form')['Switch'];
        ProSlider: typeof import('./form')['Slider'];
        ProText: typeof import('./form')['Text'];
        ProNumber: typeof import('./form')['Number'];
        ProTextarea: typeof import('./form')['Textarea'];
        ProPassword: typeof import('./form')['Password'];
    }
}
