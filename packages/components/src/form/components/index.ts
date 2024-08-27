import type { App } from 'vue'
import Field, { fieldProps } from './Field'
import Date, { dateProps } from './Date'
import DateRange, { dateRangeProps } from './DateRange'
import DateWeek, { dateWeekProps } from './DateWeek'
import DateWeekRange, { dateWeekRangeProps } from './DateWeekRange'
import DateMonth, { dateMonthProps } from './DateMonth'
import DateMonthRange, { dateMonthRangeProps } from './DateMonthRange'
import DateQuarter, { dateQuarterProps } from './DateQuarter'
import DateQuarterRange, { dateQuarterRangeProps } from './DateQuarterRange'
import DateYear, { dateYearProps } from './DateYear'
import DateYearRange, { dateYearRangeProps } from './DateYearRange'
import DateTime, { dateTimeProps } from './DateTime'
import DateTimeRange, { dateTimeRangeProps } from './DateTimeRange'
import Time, { timeProps } from './Time'
import TimeRange, { timeRangeProps } from './TimeRange'
import Select, { selectProps } from './Select'
import TreeSelect, { treeSelectProps } from './TreeSelect'
import Cascader, { cascaderProps } from './Cascader'
import Radio, { radioProps } from './Radio'
import Checkbox, { checkboxProps } from './Checkbox'
import Switch, { switchProps } from './Switch'
import Slider, { sliderProps } from './Slider'
import Text, { textProps } from './Text'
import Number, { numberProps } from './Number'
import Textarea, { textareaProps } from './Textarea'
import Password, { passwordProps } from './Password'

Field.install = function (app: App): App {
    app.component(Field.name as string, Field)
    return app
}
Date.install = function (app: App): App {
    app.component(Date.name as string, Date)
    return app
}
DateRange.install = function (app: App): App {
    app.component(DateRange.name as string, DateRange)
    return app
}
DateWeek.install = function (app: App): App {
    app.component(DateWeek.name as string, DateWeek)
    return app
}
DateWeekRange.install = function (app: App): App {
    app.component(DateWeekRange.name as string, DateWeekRange)
    return app
}
DateMonth.install = function (app: App): App {
    app.component(DateMonth.name as string, DateMonth)
    return app
}
DateMonthRange.install = function (app: App): App {
    app.component(DateMonthRange.name as string, DateMonthRange)
    return app
}
DateQuarter.install = function (app: App): App {
    app.component(DateQuarter.name as string, DateQuarter)
    return app
}
DateQuarterRange.install = function (app: App): App {
    app.component(DateQuarterRange.name as string, DateQuarterRange)
    return app
}
DateYear.install = function (app: App): App {
    app.component(DateYear.name as string, DateYear)
    return app
}
DateYearRange.install = function (app: App): App {
    app.component(DateYearRange.name as string, DateYearRange)
    return app
}
DateTime.install = function (app: App): App {
    app.component(DateTime.name as string, DateTime)
    return app
}
DateTimeRange.install = function (app: App): App {
    app.component(DateTimeRange.name as string, DateTimeRange)
    return app
}
Time.install = function (app: App): App {
    app.component(Time.name as string, Time)
    return app
}
TimeRange.install = function (app: App): App {
    app.component(TimeRange.name as string, TimeRange)
    return app
}
Select.install = function (app: App): App {
    app.component(Select.name as string, Select)
    return app
}
TreeSelect.install = function (app: App): App {
    app.component(TreeSelect.name as string, TreeSelect)
    return app
}
Cascader.install = function (app: App): App {
    app.component(Cascader.name as string, Cascader)
    return app
}
Radio.install = function (app: App): App {
    app.component(Radio.name as string, Radio)
    return app
}
Checkbox.install = function (app: App): App {
    app.component(Checkbox.name as string, Checkbox)
    return app
}
Switch.install = function (app: App): App {
    app.component(Switch.name as string, Switch)
    return app
}
Slider.install = function (app: App): App {
    app.component(Slider.name as string, Slider)
    return app
}
Text.install = function (app: App): App {
    app.component(Text.name as string, Text)
    return app
}
Number.install = function (app: App): App {
    app.component(Number.name as string, Number)
    return app
}
Textarea.install = function (app: App): App {
    app.component(Textarea.name as string, Textarea)
    return app
}
Password.install = function (app: App): App {
    app.component(Password.name as string, Password)
    return app
}

export { Field, fieldProps }
export { Date, dateProps }
export { DateRange, dateRangeProps }
export { DateWeek, dateWeekProps }
export { DateWeekRange, dateWeekRangeProps }
export { DateMonth, dateMonthProps }
export { DateMonthRange, dateMonthRangeProps }
export { DateQuarter, dateQuarterProps }
export { DateQuarterRange, dateQuarterRangeProps }
export { DateYear, dateYearProps }
export { DateYearRange, dateYearRangeProps }
export { DateTime, dateTimeProps }
export { DateTimeRange, dateTimeRangeProps }
export { Time, timeProps }
export { TimeRange, timeRangeProps }
export { Select, selectProps }
export { TreeSelect, treeSelectProps }
export { Cascader, cascaderProps }
export { Radio, radioProps }
export { Checkbox, checkboxProps }
export { Switch, switchProps }
export { Slider, sliderProps }
export { Text, textProps }
export { Number, numberProps }
export { Textarea, textareaProps }
export { Password, passwordProps }

export type { FieldSizeType, FieldProps, FieldInstance } from './Field'
export type { DateProps, DateInstance } from './Date'
export type { DateRangeProps, DateRangeInstance } from './DateRange'
export type { DateWeekProps, DateWeekInstance } from './DateWeek'
export type { DateWeekRangeProps, DateWeekRangeInstance } from './DateWeekRange'
export type { DateMonthProps, DateMonthInstance } from './DateMonth'
export type { DateMonthRangeProps, DateMonthRangeInstance } from './DateMonthRange'
export type { DateQuarterProps, DateQuarterInstance } from './DateQuarter'
export type { DateQuarterRangeProps, DateQuarterRangeInstance } from './DateQuarterRange'
export type { DateYearProps, DateYearInstance } from './DateYear'
export type { DateYearRangeProps, DateYearRangeInstance } from './DateYearRange'
export type { DateTimeProps, DateTimeInstance } from './DateTime'
export type { DateTimeRangeProps, DateTimeRangeInstance } from './DateTimeRange'
export type { TimeProps, TimeInstance } from './Time'
export type { TimeRangeProps, TimeRangeInstance } from './TimeRange'
export type { SelectProps, SelectInstance } from './Select'
export type { TreeSelectProps, TreeSelectInstance } from './TreeSelect'
export type { CascaderProps, CascaderInstance } from './Cascader'
export type { RadioProps, RadioInstance } from './Radio'
export type { CheckboxProps, CheckboxInstance } from './Checkbox'
export type { SwitchProps, SwitchInstance } from './Switch'
export type { SliderProps, SliderInstance } from './Slider'
export type { TextProps, TextInstance } from './Text'
export type { NumberProps, NumberInstance } from './Number'
export type { TextareaProps, TextareaInstance } from './Textarea'
export type { PasswordProps, PasswordInstance } from './Password'
