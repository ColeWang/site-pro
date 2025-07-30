<h1 align="center">
QueryFilter - 筛选表单
</h1>

QueryFilter 是 [Form](./form) 的一个变体，表现与 Form 相同。有些时候表单要与别的组件组合使用，就需要一些特殊形态的表单。QueryFilter 解决了配合组件使用的问题。

[Table](./table) 中默认支持了 QueryFilter 作为筛选表单。

## API {#query-filter-api}

QueryFilter 除了继承 [Form](./form) 的 API 以外还支持下面的属性。

### QueryFilter Props {#query-filter-props}

| 属性                | 说明         | 类型              | 可选值                            | 默认值        |
|-------------------|------------|-----------------|--------------------------------|------------|
| loading           | 布局         | string          | horizontal / vertical / inline | horizontal |
| collapsed         | 布局         | string          | horizontal / vertical / inline | horizontal |
| showCollapse      | 布局         | string          | horizontal / vertical / inline | horizontal |
| submitter         | 布局         | string          | horizontal / vertical / inline | horizontal |
| layout            | 布局         | string          | horizontal / vertical / inline | horizontal |
| labelWidth        | 默认值        | string / number | -                              | -          |
| compact           | 重置是否提交     | boolean         | -                              | false      |
| defaultRowsNumber | 开启 grid 模式 | number          | -                              | false      |
| breakPoints       | 开启 grid 模式 | object          | -                              | false      |

### QueryFilter Emits {#query-filter-emits}

| 事件         | 说明          | 回调参数                                               |
|------------|-------------|----------------------------------------------------|
| onSubmit   | 提交并且校验通过的回调 | Function(values)                                   |
| onReset    | 提交并且校验通过的回调 | Function(values)                                   |
| onFormRef  | 提交时触发       | Function(e: Event \| \{ \_\_MARK\_\_: 'submit' \}) |
| onResize   | 提交并且校验通过的回调 | Function(values)                                   |
| onCollapse | 提交并且校验通过的回调 | Function(values)                                   |
