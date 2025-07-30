<h1 align="center">
QueryFilter - 筛选表单
</h1>

QueryFilter 是 [Form](./form) 的一个变体，表现与 Form 相同。有些时候表单要与别的组件组合使用，就需要一些特殊形态的表单。QueryFilter
解决了配合组件使用的问题。

[Table](./table) 中默认支持了 QueryFilter 作为筛选表单。

## API {#query-filter-api}

QueryFilter 除了继承 [Form](./form) 的 API 以外还支持下面的属性。

### QueryFilter Props {#query-filter-props}

| 属性                | 说明                             | 类型                                                                                                                                    | 可选值                       | 默认值          |
|-------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|---------------------------|--------------|
| layout            | 布局                             | string                                                                                                                                | 'horizontal' / 'vertical' | 'horizontal' |
| labelWidth        | label 宽度                       | 'auto' / number                                                                                                                       | -                         | 80           |
| collapse          | 开启折叠模式                         | boolean                                                                                                                               | -                         | false        |
| defaultCollapsed  | 默认状态下是否折叠超出的表单项                | boolean                                                                                                                               | -                         | true         |
| defaultRowsNumber | 折叠状态下默认显示的表单控件行数，表单项不足时将隐藏展开按钮 | number                                                                                                                                | -                         | 1            |
| compact           | 开启紧凑模式                         | boolean                                                                                                                               | -                         | false        |
| breakPoints       | 断点                             | [BreakPointsConfig](https://github.com/ColeWang/site-pro/blob/master/packages/components/src/query-filter/hooks/useBreakPoint.ts#L32) | -                         | -            |
| loading           | 提交按钮的加载状态                      | boolean                                                                                                                               | -                         | false        |
| submitter         | 提交/重置按钮所在 props                | [SubmitterProps](https://github.com/ColeWang/site-pro/blob/master/packages/components/src/base-form/helpers/Submitter.tsx#L8)         | -                         | -            |

### QueryFilter Emits {#query-filter-emits}

| 事件         | 说明          | 回调参数                                               |
|------------|-------------|----------------------------------------------------|
| onFormRef  | 提交时触发       | Function(e: Event \| \{ \_\_MARK\_\_: 'submit' \}) |
| onResize   | 提交并且校验通过的回调 | Function(values)                                   |
| onReset    | 提交并且校验通过的回调 | Function(values)                                   |
| onCollapse | 提交并且校验通过的回调 | Function(values)                                   |
