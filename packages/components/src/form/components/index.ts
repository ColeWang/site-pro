import type { App } from 'vue'
import type { FieldInstance, FieldProps, FieldSizeType } from './Field'
import Field, { fieldProps } from './Field'
import withFieldType from './withFieldType'

export { Field, fieldProps, withFieldType }
export type { FieldSizeType, FieldProps, FieldInstance }

export const Date = withFieldType('date', 'ProDate')
Date.install = (app: App) => {
    app.component(Date.name as string, Date)
}

export const DateRange = withFieldType('dateRange', 'ProDateRange')
DateRange.install = (app: App) => {
    app.component(DateRange.name as string, DateRange)
}

export const DateWeek = withFieldType('dateWeek', 'ProDateWeek')
DateWeek.install = (app: App) => {
    app.component(DateWeek.name as string, DateWeek)
}

export const DateWeekRange = withFieldType('dateWeekRange', 'ProDateWeekRange')
DateWeekRange.install = (app: App) => {
    app.component(DateWeekRange.name as string, DateWeekRange)
}

export const DateMonth = withFieldType('dateMonth', 'ProDateMonth')
DateMonth.install = (app: App) => {
    app.component(DateMonth.name as string, DateMonth)
}

export const DateMonthRange = withFieldType('dateMonthRange', 'ProDateMonthRange')
DateMonthRange.install = (app: App) => {
    app.component(DateMonthRange.name as string, DateMonthRange)
}

export const DateQuarter = withFieldType('dateQuarter', 'ProDateQuarter')
DateQuarter.install = (app: App) => {
    app.component(DateQuarter.name as string, DateQuarter)
}

export const DateQuarterRange = withFieldType('dateQuarterRange', 'ProDateQuarterRange')
DateQuarterRange.install = (app: App) => {
    app.component(DateQuarterRange.name as string, DateQuarterRange)
}

export const DateYear = withFieldType('dateYear', 'ProDateYear')
DateYear.install = (app: App) => {
    app.component(DateYear.name as string, DateYear)
}

export const DateYearRange = withFieldType('dateYearRange', 'ProDateYearRange')
DateYearRange.install = (app: App) => {
    app.component(DateYearRange.name as string, DateYearRange)
}

export const DateTime = withFieldType('dateTime', 'ProDateTime')
DateTime.install = (app: App) => {
    app.component(DateTime.name as string, DateTime)
}

export const DateTimeRange = withFieldType('dateTimeRange', 'ProDateTimeRange')
DateTimeRange.install = (app: App) => {
    app.component(DateTimeRange.name as string, DateTimeRange)
}

export const Time = withFieldType('time', 'ProTime')
Time.install = (app: App) => {
    app.component(Time.name as string, Time)
}

export const TimeRange = withFieldType('timeRange', 'ProTimeRange')
TimeRange.install = (app: App) => {
    app.component(TimeRange.name as string, TimeRange)
}

export const Select = withFieldType('select', 'ProSelect')
Select.install = (app: App) => {
    app.component(Select.name as string, Select)
}

export const TreeSelect = withFieldType('treeSelect', 'ProTreeSelect')
TreeSelect.install = (app: App) => {
    app.component(TreeSelect.name as string, TreeSelect)
}

export const Cascader = withFieldType('cascader', 'ProCascader')
Cascader.install = (app: App) => {
    app.component(Cascader.name as string, Cascader)
}

export const Radio = withFieldType('radio', 'ProRadio')
Radio.install = (app: App) => {
    app.component(Radio.name as string, Radio)
}

export const Checkbox = withFieldType('checkbox', 'ProCheckbox')
Checkbox.install = (app: App) => {
    app.component(Checkbox.name as string, Checkbox)
}

export const Switch = withFieldType('switch', 'ProSwitch')
Switch.install = (app: App) => {
    app.component(Switch.name as string, Switch)
}

export const Slider = withFieldType('slider', 'ProSlider')
Slider.install = (app: App) => {
    app.component(Slider.name as string, Slider)
}

export const Number = withFieldType('number', 'ProNumber')
Number.install = (app: App) => {
    app.component(Number.name as string, Number)
}

export const Textarea = withFieldType('textarea', 'ProTextarea')
Textarea.install = (app: App) => {
    app.component(Textarea.name as string, Textarea)
}

export const Password = withFieldType('password', 'ProPassword')
Password.install = (app: App) => {
    app.component(Password.name as string, Password)
}

export const Text = withFieldType('text', 'ProText')
Text.install = (app: App) => {
    app.component(Text.name as string, Text)
}
