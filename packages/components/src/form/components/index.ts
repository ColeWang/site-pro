import type { App } from 'vue'
import Field, { fieldProps } from './Field'
import withFieldType from './withFieldType'

export { Field, fieldProps, withFieldType }
export type { FieldSizeType, FieldProps, FieldInstance } from './Field'

export const Date = withFieldType('date', 'ProDate')
Date.install = (app: App) => {
    app.component(Date.name as string, Date)
    return app
}

export const DateRange = withFieldType('dateRange', 'ProDateRange')
DateRange.install = (app: App) => {
    app.component(DateRange.name as string, DateRange)
    return app
}

export const DateWeek = withFieldType('dateWeek', 'ProDateWeek')
DateWeek.install = (app: App) => {
    app.component(DateWeek.name as string, DateWeek)
    return app
}

export const DateWeekRange = withFieldType('dateWeekRange', 'ProDateWeekRange')
DateWeekRange.install = (app: App) => {
    app.component(DateWeekRange.name as string, DateWeekRange)
    return app
}

export const DateMonth = withFieldType('dateMonth', 'ProDateMonth')
DateMonth.install = (app: App) => {
    app.component(DateMonth.name as string, DateMonth)
    return app
}

export const DateMonthRange = withFieldType('dateMonthRange', 'ProDateMonthRange')
DateMonthRange.install = (app: App) => {
    app.component(DateMonthRange.name as string, DateMonthRange)
    return app
}

export const DateQuarter = withFieldType('dateQuarter', 'ProDateQuarter')
DateQuarter.install = (app: App) => {
    app.component(DateQuarter.name as string, DateQuarter)
    return app
}

export const DateQuarterRange = withFieldType('dateQuarterRange', 'ProDateQuarterRange')
DateQuarterRange.install = (app: App) => {
    app.component(DateQuarterRange.name as string, DateQuarterRange)
    return app
}

export const DateYear = withFieldType('dateYear', 'ProDateYear')
DateYear.install = (app: App) => {
    app.component(DateYear.name as string, DateYear)
    return app
}

export const DateYearRange = withFieldType('dateYearRange', 'ProDateYearRange')
DateYearRange.install = (app: App) => {
    app.component(DateYearRange.name as string, DateYearRange)
    return app
}

export const DateTime = withFieldType('dateTime', 'ProDateTime')
DateTime.install = (app: App) => {
    app.component(DateTime.name as string, DateTime)
    return app
}

export const DateTimeRange = withFieldType('dateTimeRange', 'ProDateTimeRange')
DateTimeRange.install = (app: App) => {
    app.component(DateTimeRange.name as string, DateTimeRange)
    return app
}

export const Time = withFieldType('time', 'ProTime')
Time.install = (app: App) => {
    app.component(Time.name as string, Time)
    return app
}

export const TimeRange = withFieldType('timeRange', 'ProTimeRange')
TimeRange.install = (app: App) => {
    app.component(TimeRange.name as string, TimeRange)
    return app
}

export const Select = withFieldType('select', 'ProSelect')
Select.install = (app: App) => {
    app.component(Select.name as string, Select)
    return app
}

export const TreeSelect = withFieldType('treeSelect', 'ProTreeSelect')
TreeSelect.install = (app: App) => {
    app.component(TreeSelect.name as string, TreeSelect)
    return app
}

export const Cascader = withFieldType('cascader', 'ProCascader')
Cascader.install = (app: App) => {
    app.component(Cascader.name as string, Cascader)
    return app
}

export const Radio = withFieldType('radio', 'ProRadio')
Radio.install = (app: App) => {
    app.component(Radio.name as string, Radio)
    return app
}

export const Checkbox = withFieldType('checkbox', 'ProCheckbox')
Checkbox.install = (app: App) => {
    app.component(Checkbox.name as string, Checkbox)
    return app
}

export const Switch = withFieldType('switch', 'ProSwitch')
Switch.install = (app: App) => {
    app.component(Switch.name as string, Switch)
    return app
}

export const Slider = withFieldType('slider', 'ProSlider')
Slider.install = (app: App) => {
    app.component(Slider.name as string, Slider)
    return app
}

export const Number = withFieldType('number', 'ProNumber')
Number.install = (app: App) => {
    app.component(Number.name as string, Number)
    return app
}

export const Textarea = withFieldType('textarea', 'ProTextarea')
Textarea.install = (app: App) => {
    app.component(Textarea.name as string, Textarea)
    return app
}

export const Password = withFieldType('password', 'ProPassword')
Password.install = (app: App) => {
    app.component(Password.name as string, Password)
    return app
}

export const Text = withFieldType('text', 'ProText')
Text.install = (app: App) => {
    app.component(Text.name as string, Text)
    return app
}
